import { Injectable } from '@nestjs/common'
import { EntityTarget, DataSource } from 'typeorm'
import { DomainEvent } from '@libs/shared/domain/event-bus/domain-event'
import { DomainEventFailoverPublisher } from '@libs/shared/domain/event-bus/domain-event-failover-publisher.repository'
import { DomainEventFailoverEntity } from './typeorm-domain-event-failover-publisher.entity'
import { DomainEventSerializer } from '../domain-event-serializer'
import { DomainEventDeserializer } from '../domain-event-deserializer'

@Injectable()
export class TypeOrmDomainEventFailoverPublisher implements DomainEventFailoverPublisher {
  constructor(
    private readonly dataSource: DataSource,
    private readonly deserializer: DomainEventDeserializer
  ) {}

  protected entitySchema(): EntityTarget<DomainEventFailoverEntity> {
    return DomainEventFailoverEntity
  }

  async publish(event: DomainEvent): Promise<void> {
    const repository = this.repository()
    const eventSerialized = DomainEventSerializer.serialize(event)

    await repository.save({
      eventId: event.eventId,
      event: eventSerialized
    })
  }

  async consume(): Promise<Array<DomainEvent>> {
    const repository = this.repository()
    const rows = await repository.find({ take: 200 })

    const events = rows
      .map(row => this.deserializer.deserialize(row.event))
      .filter(Boolean)

    return events
  }

  private repository() {
    return this.dataSource.getRepository(this.entitySchema())
  }
}
