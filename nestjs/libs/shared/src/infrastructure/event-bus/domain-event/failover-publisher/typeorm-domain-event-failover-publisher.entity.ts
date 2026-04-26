import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: 'domain_events', schema: 'eventbus' })
export class DomainEventFailoverEntity {
  @PrimaryColumn('uuid')
    eventId!: string

  @Column({ type: 'text' })
    event!: string
}
