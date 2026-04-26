import { DomainEvent } from './event-bus/domain-event'

export abstract class AggregateRoot {
  private domainEvents: Array<DomainEvent>

  constructor() {
    this.domainEvents = []
  }

  public record(event: DomainEvent): void {
    this.domainEvents.push(event)
  }

  public pullDomainEvents(): DomainEvent[] {
    const domainEvents = [...this.domainEvents]
    this.domainEvents = []

    return domainEvents
  }

  abstract toPrimitives(): unknown;
  abstract equals(other: AggregateRoot): boolean
}
