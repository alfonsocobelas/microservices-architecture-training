import { DomainEvent } from '@libs/shared/domain/event-bus/domain-event'

type AircraftRegisteredDomainEventAttributes = {
  modelId: string
  tailNumber: string
  engineIds: string[]
  status: string
  isActive: boolean
  totalFlightHours: number
  fuelLevelPercentage: number
}
export class AircraftRegisteredDomainEvent extends DomainEvent {
  static EVENT_NAME = 'aircraft.registered'

  readonly modelId: string
  readonly tailNumber: string
  readonly engineIds: string[]
  readonly status: string
  readonly isActive: boolean
  readonly totalFlightHours: number
  readonly fuelLevelPercentage: number

  constructor({
    eventId,
    occurredOn,
    aggregateId,
    modelId,
    tailNumber,
    engineIds,
    status,
    isActive,
    totalFlightHours,
    fuelLevelPercentage
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
    modelId: string
    tailNumber: string
    engineIds: string[]
    status: string
    isActive: boolean
    totalFlightHours: number
    fuelLevelPercentage: number
  }) {
    super({ eventName: AircraftRegisteredDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
    this.modelId = modelId
    this.tailNumber = tailNumber
    this.engineIds = engineIds
    this.status = status
    this.isActive = isActive
    this.totalFlightHours = totalFlightHours
    this.fuelLevelPercentage = fuelLevelPercentage
  }

  public toPrimitives() {
    return {
      modelId: this.modelId,
      tailNumber: this.tailNumber,
      engineIds: this.engineIds,
      status: this.status,
      isActive: this.isActive,
      totalFlightHours: this.totalFlightHours,
      fuelLevelPercentage: this.fuelLevelPercentage
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: AircraftRegisteredDomainEventAttributes
  }): AircraftRegisteredDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new AircraftRegisteredDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      modelId: attributes.modelId,
      tailNumber: attributes.tailNumber,
      engineIds: attributes.engineIds,
      status: attributes.status,
      isActive: attributes.isActive,
      totalFlightHours: attributes.totalFlightHours,
      fuelLevelPercentage: attributes.fuelLevelPercentage
    })
  }
}
