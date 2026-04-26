import { DomainEvent } from '@libs/shared/domain/event-bus/domain-event'

type FleetAircraftRetiredDomainEventAttributes = {
  aircraftId: string
}

export class FleetAircraftRetiredDomainEvent extends DomainEvent {
  static EVENT_NAME = 'fleet.aircraft.retired'

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
    super({ eventName: FleetAircraftRetiredDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
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
    attributes: FleetAircraftRetiredDomainEventAttributes
  }): FleetAircraftRetiredDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new FleetAircraftRetiredDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      aircraftId: attributes.aircraftId
    })
  }
}
