import { DomainEvent } from 'src/contexts/shared/domain/event-bus/domain-event'

export class DomainEventSerializer {
  static serialize(event: DomainEvent): string {
    return JSON.stringify({
      data: {
        id: event.eventId,
        type: event.eventName,
        occurred_on: event.occurredOn.toISOString(),
        aggregateId: event.aggregateId,
        attributes: event.toPrimitives()
      }
    })
  }
}
