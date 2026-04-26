import { ConsumeMessage } from 'amqplib'
import { DomainEvent } from '@libs/shared/domain/event-bus/domain-event'
import { DomainEventSubscriber } from '@libs/shared/domain/event-bus/domain-event-subscriber'
import { DomainEventDeserializer } from '../domain-event/domain-event-deserializer'
import { RabbitMqConnection } from './rabbitmq-connection'

export class RabbitMqConsumer {
  constructor(
    private readonly subscriber: DomainEventSubscriber<DomainEvent>,
    private readonly deserializer: DomainEventDeserializer,
    private readonly connection: RabbitMqConnection,
    private readonly queueName: string,
    private readonly exchange: string,
    private readonly maxRetries: number
  ) {}

  async onMessage(message: ConsumeMessage) {
    const content = message.content.toString()
    const domainEvent = this.deserializer.deserialize(content)

    try {
      await this.subscriber.on(domainEvent)
    } catch (error) {
      await this.handleError(message)
    } finally {
      this.connection.ack(message)
    }
  }

  private async handleError(message: ConsumeMessage) {
    if (this.hasBeenRedeliveredTooMuch(message)) {
      await this.deadLetter(message)
    } else {
      await this.retry(message)
    }
  }

  private async retry(message: ConsumeMessage) {
    await this.connection.retry(message, this.queueName, this.exchange)
  }

  private async deadLetter(message: ConsumeMessage) {
    await this.connection.deadLetter(message, this.queueName, this.exchange)
  }

  private hasBeenRedeliveredTooMuch(message: ConsumeMessage) {
    if (this.hasBeenRedelivered(message)) {
      const count = parseInt(message.properties.headers?.['redelivery_count'])
      return count >= this.maxRetries
    }
    return false
  }

  private hasBeenRedelivered(message: ConsumeMessage) {
    return message.properties.headers?.['redelivery_count'] !== undefined
  }
}
