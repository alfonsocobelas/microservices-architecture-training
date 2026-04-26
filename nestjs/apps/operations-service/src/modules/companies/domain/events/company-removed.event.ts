import { DomainEvent } from '@libs/shared/domain/event-bus/domain-event'

type CompanyRemovedDomainEventAttributes = {
  name: string
}
export class CompanyRemovedDomainEvent extends DomainEvent {
  static EVENT_NAME = 'company.removed'

  readonly name: string

  constructor({
    eventId,
    occurredOn,
    aggregateId,
    name
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
    name: string
  }) {
    super({ eventName: CompanyRemovedDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
    this.name = name
  }

  public toPrimitives() {
    return {
      name: this.name
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: CompanyRemovedDomainEventAttributes
  }): CompanyRemovedDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new CompanyRemovedDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      name: attributes.name
    })
  }
}
