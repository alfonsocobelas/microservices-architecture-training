import { Injectable } from '@nestjs/common'
import { DomainEvent } from '@libs/shared/domain/event-bus/domain-event'
import { DomainEventSubscriber } from '@libs/shared/domain/event-bus/domain-event-subscriber'

@Injectable()
export class RabbitMQqueueFormatter {
  private readonly moduleName: string = 'mooc'
  // constructor(private moduleName: string) {}

  format(subscriber: DomainEventSubscriber<DomainEvent>) {
    const value = subscriber.constructor.name
    const name = value
      .split(/(?=[A-Z])/)
      .join('_')
      .toLowerCase()
    return `${this.moduleName}.${name}`
  }

  formatRetry(subscriber: DomainEventSubscriber<DomainEvent>) {
    const name = this.format(subscriber)
    return `retry.${name}`
  }

  formatDeadLetter(subscriber: DomainEventSubscriber<DomainEvent>) {
    const name = this.format(subscriber)
    return `dead_letter.${name}`
  }
}
