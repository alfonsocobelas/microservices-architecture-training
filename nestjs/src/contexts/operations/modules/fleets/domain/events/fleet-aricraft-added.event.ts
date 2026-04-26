import { DomainEvent } from 'src/contexts/shared/domain/event-bus/domain-event'

type FleetAircraftAddedDomainEventAttributes = {
  aircraftId: string
}

export class FleetAircraftAddedDomainEvent extends DomainEvent {
  static EVENT_NAME = 'fleet.aircraft_added'

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
    super({ eventName: FleetAircraftAddedDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
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
    attributes: FleetAircraftAddedDomainEventAttributes
  }): FleetAircraftAddedDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new FleetAircraftAddedDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      aircraftId: attributes.aircraftId
    })
  }
}
