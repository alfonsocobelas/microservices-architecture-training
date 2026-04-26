/* eslint-disable @typescript-eslint/no-explicit-any */
import { UuidV7ValueObject } from '../value-objects/uuidv7-value-object'

type DomainEventAttributes = any

export type DomainEventClass = {
  EVENT_NAME: string
  fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: DomainEventAttributes
  }): DomainEvent
}

export abstract class DomainEvent {
  static EVENT_NAME: string

  readonly eventName: string
  readonly eventId: string
  readonly occurredOn: Date
  readonly aggregateId: string

  constructor(params: { eventName: string; aggregateId: string; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventName, eventId, occurredOn } = params
    this.eventName = eventName
    this.eventId = eventId || UuidV7ValueObject.random().value
    this.occurredOn = occurredOn || new Date()
    this.aggregateId = aggregateId
  }

  public abstract toPrimitives(): DomainEventAttributes

  static fromPrimitives: (params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: DomainEventAttributes
  }) => DomainEvent
}
