import { DomainEvent } from './domain-event'
import { DomainEventSubscribers } from './domain-event-subscribers'

export abstract class EventBus {
  abstract publish(events: Array<DomainEvent>): Promise<void>
  abstract addSubscribers(subscribers: DomainEventSubscribers): Promise<void>
}
