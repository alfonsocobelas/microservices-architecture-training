import { DomainEvent } from './domain-event'
import { DomainEventSubscriber } from './domain-event-subscriber'

export class DomainEventSubscribers {
  constructor(public readonly items: Array<DomainEventSubscriber<DomainEvent>>) {}
}
