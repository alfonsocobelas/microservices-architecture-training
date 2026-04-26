import { DomainEvent } from 'src/contexts/shared/domain/event-bus/domain-event'

type AircraftRetiredFromFleetDomainEventAttributes = {
  fleetId: string
}
export class AircraftRetiredFromFleetDomainEvent extends DomainEvent {
  static EVENT_NAME = 'aircraft.retired_from_fleet'

  readonly fleetId: string

  constructor({
    eventId,
    occurredOn,
    aggregateId,
    fleetId
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
    fleetId: string
  }) {
    super({ eventName: AircraftRetiredFromFleetDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
    this.fleetId = fleetId
  }

  public toPrimitives() {
    return {
      fleetId: this.fleetId
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: AircraftRetiredFromFleetDomainEventAttributes
  }): AircraftRetiredFromFleetDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new AircraftRetiredFromFleetDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      fleetId: attributes.fleetId
    })
  }
}
