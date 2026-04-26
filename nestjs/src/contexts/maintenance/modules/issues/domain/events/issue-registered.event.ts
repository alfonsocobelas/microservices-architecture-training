import { DomainEvent } from 'src/contexts/shared/domain/event-bus/domain-event'

type IssueRegisteredDomainEventAttributes = {
  code: string
  description: string
  severity: string
  requiresGrounding: boolean
  partCategory: string
  aircraftId?: string
  engineId?: string
}
export class IssueRegisteredDomainEvent extends DomainEvent {
  static EVENT_NAME = 'issue.registered'

  readonly code: string
  readonly description: string
  readonly severity: string
  readonly requiresGrounding: boolean
  readonly partCategory: string
  readonly aircraftId?: string
  readonly engineId?: string

  constructor({
    eventId,
    occurredOn,
    aggregateId,
    code,
    description,
    severity,
    requiresGrounding,
    partCategory,
    aircraftId,
    engineId
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
    code: string
    description: string
    severity: string
    requiresGrounding: boolean
    partCategory: string
    aircraftId?: string
    engineId?: string
  }) {
    super({ eventName: IssueRegisteredDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
    this.code = code
    this.description = description
    this.severity = severity
    this.requiresGrounding = requiresGrounding
    this.partCategory = partCategory
    this.aircraftId = aircraftId
    this.engineId = engineId
  }

  public toPrimitives() {
    return {
      code: this.code,
      description: this.description,
      severity: this.severity,
      requiresGrounding: this.requiresGrounding,
      partCategory: this.partCategory,
      aircraftId: this.aircraftId,
      engineId: this.engineId
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: IssueRegisteredDomainEventAttributes
  }): IssueRegisteredDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new IssueRegisteredDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      code: attributes.code,
      description: attributes.description,
      severity: attributes.severity,
      requiresGrounding: attributes.requiresGrounding,
      partCategory: attributes.partCategory,
      aircraftId: attributes.aircraftId,
      engineId: attributes.engineId
    })
  }
}
