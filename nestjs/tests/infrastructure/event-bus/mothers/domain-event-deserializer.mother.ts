import { DomainEventSubscribers } from '@libs/shared/domain/event-bus/domain-event-subscribers'
import { DomainEventDeserializer } from '@libs/shared/infrastructure/event-bus/domain-event/domain-event-deserializer'
import { DomainEventSubscriberDummy } from '../mocks/domain-event-subscriber.mock'

export class DomainEventDeserializerMother {
  static create() {
    const dummySubscriber = new DomainEventSubscriberDummy()
    const subscribers = new DomainEventSubscribers([dummySubscriber])

    return DomainEventDeserializer.configure(subscribers)
  }
}
