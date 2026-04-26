import { DomainEvent } from 'src/contexts/shared/domain/event-bus/domain-event'

export class AircraftStatusUpdatedToMaintenanceDomainEvent extends DomainEvent {
  static EVENT_NAME = 'aircraft.status_updated_to_maintenance'

  constructor({
    eventId,
    occurredOn,
    aggregateId
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
  }) {
    super({ eventName: AircraftStatusUpdatedToMaintenanceDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
  }

  public toPrimitives() {
    return {}
  }

  static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: {}
  }): AircraftStatusUpdatedToMaintenanceDomainEvent {
    const { aggregateId, eventId, occurredOn } = params

    return new AircraftStatusUpdatedToMaintenanceDomainEvent({
      aggregateId,
      eventId,
      occurredOn
    })
  }
}
