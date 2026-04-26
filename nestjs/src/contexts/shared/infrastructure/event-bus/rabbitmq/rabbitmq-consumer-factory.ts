import { DomainEvent } from 'src/contexts/shared/domain/event-bus/domain-event'
import { DomainEventSubscriber } from 'src/contexts/shared/domain/event-bus/domain-event-subscriber'
import { DomainEventDeserializer } from '../domain-event/domain-event-deserializer'
import { RabbitMqConnection } from './rabbitmq-connection'
import { RabbitMqConsumer } from './rabbitmq-consumer'

export class RabbitMQConsumerFactory {
  constructor(
    private deserializer: DomainEventDeserializer,
    private connection: RabbitMqConnection,
    private maxRetries: number,
    private exchange: string
  ) {}

  build(subscriber: DomainEventSubscriber<DomainEvent>, queueName: string) {
    return new RabbitMqConsumer(
      subscriber,
      this.deserializer,
      this.connection,
      queueName,
      this.exchange,
      this.maxRetries
    )
  }
}
