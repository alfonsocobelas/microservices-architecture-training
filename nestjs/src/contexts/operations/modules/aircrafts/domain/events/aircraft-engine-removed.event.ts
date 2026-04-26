import { DomainEvent } from 'src/contexts/shared/domain/event-bus/domain-event'

type AircraftEngineRemovedDomainEventAttributes = {
  engineId: string
}

export class AircraftEngineRemovedDomainEvent extends DomainEvent {
  static EVENT_NAME = 'aircraft.engine_removed'

  readonly engineId: string

  constructor({
    eventId,
    occurredOn,
    aggregateId,
    engineId
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
    engineId: string
  }) {
    super({ eventName: AircraftEngineRemovedDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
    this.engineId = engineId
  }

  public toPrimitives() {
    return {
      engineId: this.engineId
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: AircraftEngineRemovedDomainEventAttributes
  }): AircraftEngineRemovedDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new AircraftEngineRemovedDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      engineId: attributes.engineId
    })
  }
}
