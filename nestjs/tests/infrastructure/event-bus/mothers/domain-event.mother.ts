import { DomainEvent } from 'src/contexts/shared/domain/event-bus/domain-event'
import { UuidV7Mother } from '../../../modules/shared/domain/mothers/uuidV7.mother'

export class DomainEventDummy extends DomainEvent {
  static readonly EVENT_NAME = 'dummy'

  constructor(data: { eventName?: string; aggregateId: string; eventId?: string; occurredOn?: Date }) {
    const { eventName = DomainEventDummy.EVENT_NAME, aggregateId, eventId, occurredOn } = data
    super({ eventName, aggregateId, eventId, occurredOn })
  }

  toPrimitives() {
    return {}
  }

  static fromPrimitives(params: { aggregateId: string; attributes: {}; eventId: string; occurredOn: Date }) {
    const { aggregateId, eventId, occurredOn } = params
    return new DomainEventDummy({
      aggregateId,
      eventId,
      occurredOn
    })
  }
}

export class DomainEventMother {
  static random() {
    return new DomainEventDummy({
      aggregateId: UuidV7Mother.random(),
      eventId: UuidV7Mother.random(),
      occurredOn: new Date()
    })
  }

  static invalid() {
    return new DomainEventDummy({
      aggregateId: UuidV7Mother.random(),
      eventId: UuidV7Mother.random(),
      eventName: 'InvalidEvent',
      occurredOn: new Date()
    })
  }
}
