import { DomainEvent } from './domain-event'

export abstract class DomainEventFailoverPublisher {
  static entitySchema = 'DomainEventFailovers'

  abstract publish(event: DomainEvent): Promise<void>
  abstract consume(): Promise<Array<DomainEvent>>
}
