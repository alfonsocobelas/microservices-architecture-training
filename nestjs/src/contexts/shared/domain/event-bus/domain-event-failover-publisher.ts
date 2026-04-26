import { AggregateRoot } from '../aggregate-root'

export class DomainEventFailoverPublisher extends AggregateRoot {
  private constructor(
    readonly eventId: string,
    readonly event: string
  ) {
    super()
  }

  static create(eventId: string, event: string): DomainEventFailoverPublisher {
    return new DomainEventFailoverPublisher(eventId, event)
  }

  static fromPrimitives(props: { eventId: string, event: string }): DomainEventFailoverPublisher {
    return new DomainEventFailoverPublisher(props.eventId, props.event)
  }

  toPrimitives(): { eventId: string, event: string } {
    return {
      eventId: this.eventId,
      event: this.event
    }
  }

  equals(other: AggregateRoot): boolean {
    if (!(other instanceof DomainEventFailoverPublisher)) {
      return false
    }

    return this.eventId === other.eventId && this.event === other.event
  }
}
