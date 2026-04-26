import { DomainEvent } from 'src/contexts/shared/domain/event-bus/domain-event'

type AircraftEngineInstalledDomainEventAttributes = {
  engineId: string
}

export class AircraftEngineInstalledDomainEvent extends DomainEvent {
  static EVENT_NAME = 'aircraft.engine_installed'

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
    super({ eventName: AircraftEngineInstalledDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
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
    attributes: AircraftEngineInstalledDomainEventAttributes
  }): AircraftEngineInstalledDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new AircraftEngineInstalledDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      engineId: attributes.engineId
    })
  }
}
