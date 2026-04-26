import { Injectable } from '@nestjs/common'
import { DomainEventClass } from '@libs/shared/domain/event-bus/domain-event'
import { DomainEventSubscribers } from '@libs/shared/domain/event-bus/domain-event-subscribers'

type DomainEventJSON = {
  id: string
  type: string
  aggregateId: string
  attributes: string
  occurred_on: string
}

@Injectable()
export class DomainEventDeserializer extends Map<string, DomainEventClass> {
  static configure(subscribers: DomainEventSubscribers) {
    const mapping = new DomainEventDeserializer()

    subscribers.items.forEach(subscriber => {
      subscriber.subscribedTo().forEach(mapping.registerEvent.bind(mapping))
    })

    return mapping
  }

  private registerEvent(domainEvent: DomainEventClass) {
    const eventName = domainEvent.EVENT_NAME
    this.set(eventName, domainEvent)
  }

  deserialize(event: string) {
    const eventData = JSON.parse(event).data as DomainEventJSON
    const eventClass = super.get(eventData.type)

    if (!eventClass) {
      throw Error(`DomainEvent mapping not found for event ${eventData.type}`)
    }

    return eventClass.fromPrimitives({
      aggregateId: eventData.aggregateId,
      attributes: eventData.attributes,
      occurredOn: new Date(eventData.occurred_on),
      eventId: eventData.id
    })
  }
}
