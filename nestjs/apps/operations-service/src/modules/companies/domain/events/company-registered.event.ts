import { DomainEvent } from '@libs/shared/domain/event-bus/domain-event'

type CompanyRegisteredDomainEventAttributes = {
  name: string
}

export class CompanyRegisteredDomainEvent extends DomainEvent {
  static EVENT_NAME = 'company.registered'

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
    super({ eventName: CompanyRegisteredDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
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
    attributes: CompanyRegisteredDomainEventAttributes
  }): CompanyRegisteredDomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params

    return new CompanyRegisteredDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      name: attributes.name
    })
  }
}
