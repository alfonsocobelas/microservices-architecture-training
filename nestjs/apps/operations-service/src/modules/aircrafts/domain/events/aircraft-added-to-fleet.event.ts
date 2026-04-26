import { DomainEvent } from '@libs/shared/domain/event-bus/domain-event'

type AircraftAddedToFleetDomainEventAttributes = {
  fleetId: string
}
export class AircraftAddedToFleetDomainEvent extends DomainEvent {
  static EVENT_NAME = 'aircraft.added_to_fleet'

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
    super({ eventName: AircraftAddedToFleetDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
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
    attributes: AircraftAddedToFleetDomainEventAttributes
  }): AircraftAddedToFleetDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new AircraftAddedToFleetDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      fleetId: attributes.fleetId
    })
  }
}
