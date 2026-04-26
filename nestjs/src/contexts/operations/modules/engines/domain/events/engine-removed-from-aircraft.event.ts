import { DomainEvent } from 'src/contexts/shared/domain/event-bus/domain-event'

type EngineRemovedFromAircraftDomainEventAttributes = {
  aircraftId: string
}

export class EngineRemovedFromAircraftDomainEvent extends DomainEvent {
  static EVENT_NAME = 'engine.removed_from_aircraft'

  readonly aircraftId: string

  constructor({
    eventId,
    occurredOn,
    aggregateId,
    aircraftId
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
    aircraftId: string
  }) {
    super({ eventName: EngineRemovedFromAircraftDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
    this.aircraftId = aircraftId
  }

  public toPrimitives() {
    return {
      aircraftId: this.aircraftId
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: EngineRemovedFromAircraftDomainEventAttributes
  }): EngineRemovedFromAircraftDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new EngineRemovedFromAircraftDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      aircraftId: attributes.aircraftId
    })
  }
}
