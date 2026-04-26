/* eslint-disable max-len */
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DomainEvent } from '@libs/shared/domain/event-bus/domain-event'
import { DomainEventSubscriber } from '@libs/shared/domain/event-bus/domain-event-subscriber'
import { RabbitMqConnection } from './rabbitmq-connection'
import { RabbitMQqueueFormatter } from './rabbitmq-queue-formatter'
import { RabbitMQExchangeNameFormatter } from './rabbitmq-exchange-name-formatter'
import { RabbitMqConfig } from '../../config/env.types'

@Injectable()
export class RabbitMqTopology {
  private readonly exchange: string

  constructor(
    private readonly configService: ConfigService,
    private readonly connection: RabbitMqConnection,
    private readonly queueNameFormatter: RabbitMQqueueFormatter
  ) {
    const config = this.configService.get<RabbitMqConfig>('rabbitmq')

    if (!config) {
      throw new Error('RabbitMQ configuration not found')
    }

    this.exchange = config.exchangeSettings.name.default
  }

  async setup(subscribers: Array<DomainEventSubscriber<DomainEvent>> ) {
    const exchangeName = this.exchange
    const retryExchangeName = RabbitMQExchangeNameFormatter.retry(exchangeName)
    const deadLetterExchangeName = RabbitMQExchangeNameFormatter.deadLetter(exchangeName)

    await this.connection.exchange({ exchangeName })
    await this.connection.exchange({ exchangeName: retryExchangeName })
    await this.connection.exchange({ exchangeName: deadLetterExchangeName })

    for (const subscriber of subscribers) {
      const queueName = this.queueNameFormatter.format(subscriber)
      const retryQueueName = this.queueNameFormatter.formatRetry(subscriber)
      const deadLetterQueueName = this.queueNameFormatter.formatDeadLetter(subscriber)

      await this.connection.queue({ queueName })
      await this.connection.queue({ queueName: deadLetterQueueName })
      await this.connection.queue({
        queueName: retryQueueName,
        messageTtl: 60000, // Retry messages after 60 seconds
        deadLetterExchange: exchangeName,
        deadLetterQueue: queueName
      })

      await this.connection.bindQueue({ queueName, exchange: exchangeName, routingKeys: this.getRoutingKeysFor(subscriber) })
      await this.connection.bindQueue({ queueName: retryQueueName, exchange: retryExchangeName, routingKeys: [queueName] })
      await this.connection.bindQueue({ queueName: deadLetterQueueName, exchange: deadLetterExchangeName, routingKeys: [queueName] })
    }
  }

  private getRoutingKeysFor(subscriber: DomainEventSubscriber<DomainEvent>) {
    const routingKeys = subscriber.subscribedTo().map(event => event.EVENT_NAME)

    const queue = this.queueNameFormatter.format(subscriber)
    routingKeys.push(queue)

    return routingKeys
  }
}
