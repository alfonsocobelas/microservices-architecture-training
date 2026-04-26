/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EventBus } from 'src/contexts/shared/domain/event-bus/event-bus'
import { DomainEvent } from 'src/contexts/shared/domain/event-bus/domain-event'
import { DomainEventSubscribers } from 'src/contexts/shared/domain/event-bus/domain-event-subscribers'
import { DomainEventFailoverPublisher } from 'src/contexts/shared/domain/event-bus/domain-event-failover-publisher.repository'
import { RabbitMqTopology } from './rabbitmq-topology'
import { RabbitMqConnection } from './rabbitmq-connection'
import { RabbitMQqueueFormatter } from './rabbitmq-queue-formatter'
import { RabbitMQConsumerFactory } from './rabbitmq-consumer-factory'
import { DomainEventDeserializer } from '../domain-event/domain-event-deserializer'
import { DomainEventSerializer } from '../domain-event/domain-event-serializer'
import { RabbitMqConfig } from '../../config/env.types' //todo: mover el type a esta carpeta

@Injectable()
export class RabbitMqEventBus implements EventBus {
  private readonly exchange: string
  private readonly maxRetries: number

  constructor(
    private readonly topology: RabbitMqTopology,
    private readonly connection: RabbitMqConnection,
    private readonly failoverPublisher: DomainEventFailoverPublisher,
    private readonly queueNameFormatter: RabbitMQqueueFormatter,
    private readonly configService: ConfigService
  ) {
    const config = this.configService.get<RabbitMqConfig>('rabbitmq')

    if (!config) {
      throw new Error('RabbitMQ configuration not found')
    }

    this.exchange = config.exchangeSettings.name.default
    this.maxRetries = config.queueSettings.retry.maxRetries.default
  }

  async publish(events: Array<DomainEvent>): Promise<void> {
    for (const event of events) {
      try {
        const routingKey = event.eventName
        const content = this.toBuffer(event)
        const options = this.options(event)

        await this.connection.publish({ routingKey, content, options })
      } catch (error: any) {
        await this.failoverPublisher.publish(event)
      }
    }
  }

  async addSubscribers(subscribers: DomainEventSubscribers): Promise<void> {
    await this.connection.start()
    await this.topology.setup(subscribers.items)

    const deserializer = DomainEventDeserializer.configure(subscribers)
    const consumerFactory = new RabbitMQConsumerFactory(deserializer, this.connection, this.maxRetries, this.exchange)

    for (const subscriber of subscribers.items) {
      const queueName = this.queueNameFormatter.format(subscriber)
      const consumer = consumerFactory.build(subscriber, queueName)

      await this.connection.consume(queueName, consumer.onMessage.bind(consumer))
    }
  }

  private toBuffer(event: DomainEvent): Buffer {
    const eventPrimitives = DomainEventSerializer.serialize(event)

    return Buffer.from(eventPrimitives)
  }

  private options(event: DomainEvent) {
    return {
      messageId: event.eventId,
      contentType: 'application/json',
      contentEncoding: 'utf-8',
      persistent: true
    }
  }
}
