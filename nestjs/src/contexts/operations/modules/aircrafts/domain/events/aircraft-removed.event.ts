import { DomainEvent } from 'src/contexts/shared/domain/event-bus/domain-event'

type AircraftRemovedDomainEventAttributes = {
  modelId: string
  tailNumber: string
  engineIds: string[]
  fleetId?: string
}

export class AircraftRemovedDomainEvent extends DomainEvent {
  static EVENT_NAME = 'aircraft.removed'

  readonly modelId: string
  readonly tailNumber: string

  constructor({
    eventId,
    occurredOn,
    aggregateId,
    modelId,
    tailNumber,
    engineIds,
    fleetId
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
    modelId: string
    tailNumber: string
    engineIds: string[]
    fleetId?: string
  }) {
    super({ eventName: AircraftRemovedDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
    this.modelId = modelId
    this.tailNumber = tailNumber
  }

  public toPrimitives() {
    return {
      modelId: this.modelId,
      tailNumber: this.tailNumber
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: AircraftRemovedDomainEventAttributes
  }): AircraftRemovedDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new AircraftRemovedDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      modelId: attributes.modelId,
      tailNumber: attributes.tailNumber,
      engineIds: attributes.engineIds,
      fleetId: attributes.fleetId
    })
  }
}

