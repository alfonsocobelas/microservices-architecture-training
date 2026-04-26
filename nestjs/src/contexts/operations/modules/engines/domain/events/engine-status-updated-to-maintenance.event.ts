import { DomainEvent } from 'src/contexts/shared/domain/event-bus/domain-event'

export class EngineStatusUpdatedToMaintenanceDomainEvent extends DomainEvent {
  static EVENT_NAME = 'engine.status_updated_to_maintenance'

  constructor({
    eventId,
    occurredOn,
    aggregateId
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
  }) {
    super({ eventName: EngineStatusUpdatedToMaintenanceDomainEvent.EVENT_NAME, eventId, occurredOn, aggregateId })
  }

  public toPrimitives() {
    return {}
  }
}
