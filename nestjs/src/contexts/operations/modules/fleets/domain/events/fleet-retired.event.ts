import { DomainEvent } from 'src/contexts/shared/domain/event-bus/domain-event'

type FleetRetiredDomainEventAttributes = {
  name: string
  companyId: string
  aircraftIds: string[]
}
export class FleetRetiredDomainEvent extends DomainEvent {
  static EVENT_NAME = 'fleet.retired'

  readonly name: string
  readonly companyId: string
  readonly aircraftIds: string[]

  constructor({
    eventId,
    occurredOn,
    aggregateId,
    name,
    companyId,
    aircraftIds
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
    name: string
    companyId: string
    aircraftIds: string[]
  }) {
    super({ eventName: FleetRetiredDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
    this.name = name
    this.companyId = companyId
    this.aircraftIds = aircraftIds
  }

  public toPrimitives() {
    return {
      name: this.name,
      companyId: this.companyId,
      aircraftIds: this.aircraftIds
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: FleetRetiredDomainEventAttributes
  }): FleetRetiredDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new FleetRetiredDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      name: attributes.name,
      companyId: attributes.companyId,
      aircraftIds: attributes.aircraftIds
    })
  }
}
