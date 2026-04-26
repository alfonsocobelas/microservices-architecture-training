import { DomainEvent } from '@libs/shared/domain/event-bus/domain-event'

type AircraftModelRegisteredDomainEventAttributes = {
  name: string
  code: string
  manufacturer: string
  passengerCapacity: number
  numEngines: number
  status: string
}
export class AircraftModelRegisteredDomainEvent extends DomainEvent {
  static EVENT_NAME = 'aircraft_model.registered'

  readonly name: string
  readonly code: string
  readonly manufacturer: string
  readonly passengerCapacity: number
  readonly numEngines: number
  readonly status: string

  constructor({
    eventId,
    occurredOn,
    aggregateId,
    name,
    code,
    manufacturer,
    passengerCapacity,
    numEngines,
    status
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
    name: string
    code: string
    manufacturer: string
    passengerCapacity: number
    numEngines: number
    status: string
  }) {
    super({ eventName: AircraftModelRegisteredDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
    this.name = name
    this.code = code
    this.manufacturer = manufacturer
    this.passengerCapacity = passengerCapacity
    this.numEngines = numEngines
    this.status = status
  }

  public toPrimitives() {
    return {
      name: this.name,
      code: this.code,
      manufacturer: this.manufacturer,
      passengerCapacity: this.passengerCapacity,
      numEngines: this.numEngines,
      status: this.status
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: AircraftModelRegisteredDomainEventAttributes
  }): AircraftModelRegisteredDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new AircraftModelRegisteredDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      name: attributes.name,
      code: attributes.code,
      manufacturer: attributes.manufacturer,
      passengerCapacity: attributes.passengerCapacity,
      numEngines: attributes.numEngines,
      status: attributes.status
    })
  }
}
