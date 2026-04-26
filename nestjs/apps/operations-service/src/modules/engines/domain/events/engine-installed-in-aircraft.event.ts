import { DomainEvent } from '@libs/shared/domain/event-bus/domain-event'

type EngineInstalledInAircraftDomainEventAttributes = {
  aircraftId: string
}

export class EngineInstalledInAircraftDomainEvent extends DomainEvent {
  static EVENT_NAME = 'engine.installed_in_aircraft'

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
    super({ eventName: EngineInstalledInAircraftDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
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
    attributes: EngineInstalledInAircraftDomainEventAttributes
  }): EngineInstalledInAircraftDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new EngineInstalledInAircraftDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      aircraftId: attributes.aircraftId
    })
  }
}
