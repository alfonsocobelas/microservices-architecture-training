import { DomainEvent } from '@libs/shared/domain/event-bus/domain-event'

type EngineRegisteredDomainEventAttributes = {
  serialNumber: string
  healthScore: number
  flyingHoursAccumulated: number
  cyclesSinceLastOverhaul: number
  isInstalled: boolean
  status: string
}

export class EngineRegisteredDomainEvent extends DomainEvent {
  static EVENT_NAME = 'engine.registered'

  readonly serialNumber: string
  readonly healthScore: number
  readonly flyingHoursAccumulated: number
  readonly cyclesSinceLastOverhaul: number
  readonly isInstalled: boolean
  readonly status: string

  constructor({
    eventId,
    occurredOn,
    aggregateId,
    serialNumber,
    healthScore,
    flyingHoursAccumulated,
    cyclesSinceLastOverhaul,
    isInstalled,
    status
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
    serialNumber: string
    healthScore: number
    flyingHoursAccumulated: number
    cyclesSinceLastOverhaul: number
    isInstalled: boolean
    status: string
  }) {
    super({ eventName: EngineRegisteredDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
    this.serialNumber = serialNumber
    this.healthScore = healthScore
    this.flyingHoursAccumulated = flyingHoursAccumulated
    this.cyclesSinceLastOverhaul = cyclesSinceLastOverhaul
    this.isInstalled = isInstalled
    this.status = status
  }

  public toPrimitives() {
    return {
      serialNumber: this.serialNumber,
      healthScore: this.healthScore,
      flyingHoursAccumulated: this.flyingHoursAccumulated,
      cyclesSinceLastOverhaul: this.cyclesSinceLastOverhaul,
      isInstalled: this.isInstalled,
      status: this.status
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: EngineRegisteredDomainEventAttributes
  }): EngineRegisteredDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new EngineRegisteredDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      serialNumber: attributes.serialNumber,
      healthScore: attributes.healthScore,
      flyingHoursAccumulated: attributes.flyingHoursAccumulated,
      cyclesSinceLastOverhaul: attributes.cyclesSinceLastOverhaul,
      isInstalled: attributes.isInstalled,
      status: attributes.status
    })
  }
}
