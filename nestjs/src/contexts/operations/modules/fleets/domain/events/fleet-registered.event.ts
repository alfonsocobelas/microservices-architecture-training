import { DomainEvent } from 'src/contexts/shared/domain/event-bus/domain-event'

type FleetRegisteredDomainEventAttributes = {
  companyId: string
  name: string
  type: string
  operationRegion: string
  maintenanceBudget: number
  aircraftIds: string[]
  status: string
}

export class FleetRegisteredDomainEvent extends DomainEvent {
  static EVENT_NAME = 'fleet.registered'

  readonly companyId: string
  readonly name: string
  readonly type: string
  readonly operationRegion: string
  readonly maintenanceBudget: number
  readonly aircraftIds: string[]
  readonly status: string

  constructor({
    eventId,
    occurredOn,
    aggregateId,
    companyId,
    name,
    type,
    operationRegion,
    maintenanceBudget,
    aircraftIds,
    status
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
    companyId: string
    name: string
    type: string
    operationRegion: string
    maintenanceBudget: number
    aircraftIds: string[]
    status: string
  }) {
    super({ eventName: FleetRegisteredDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
    this.companyId = companyId
    this.name = name
    this.type = type
    this.operationRegion = operationRegion
    this.maintenanceBudget = maintenanceBudget
    this.aircraftIds = aircraftIds
    this.status = status
  }

  public toPrimitives() {
    return {
      companyId: this.companyId,
      name: this.name,
      type: this.type,
      operationRegion: this.operationRegion,
      maintenanceBudget: this.maintenanceBudget,
      aircraftIds: this.aircraftIds,
      status: this.status
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: FleetRegisteredDomainEventAttributes
  }): FleetRegisteredDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new FleetRegisteredDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      companyId: attributes.companyId,
      name: attributes.name,
      type: attributes.type,
      operationRegion: attributes.operationRegion,
      maintenanceBudget: attributes.maintenanceBudget,
      aircraftIds: attributes.aircraftIds,
      status: attributes.status
    })
  }
}
