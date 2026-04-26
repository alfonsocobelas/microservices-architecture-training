import { TypeOrmDomainEventFailoverPublisher } from 'src/contexts/shared/infrastructure/event-bus/domain-event/failover-publisher/typeorm-domain-event-failover-publisher.'
import { DomainEventMother } from './mothers/domain-event.mother'
import { moduleFixture } from '../../jest.setup.integration'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockDeserializer = (dummyEvent: any) => {
  return {
    deserialize: jest.fn().mockReturnValue(dummyEvent)
  }
}

let failoverPublisher: TypeOrmDomainEventFailoverPublisher

beforeAll(async () => {
  failoverPublisher = moduleFixture.get<TypeOrmDomainEventFailoverPublisher>(TypeOrmDomainEventFailoverPublisher)
})

describe('DomainEventFailoverPublisher (integration tests)', () => {
  it('should publish and consume a domain event from the failover repository', async () => {
    const event = DomainEventMother.random()
    // @ts-ignore
    failoverPublisher['deserializer'] = mockDeserializer(event)
    await failoverPublisher.publish(event)

    const events = await failoverPublisher.consume()
    expect(events).toHaveLength(1)
    expect(events[0]).toEqual(event)
  })

  // it('should consume only valid domain events from the failover repository', async () => {
  //   const validEvent = DomainEventMother.random()
  //   const invalidEvent = DomainEventMother.invalid()

  //   // @ts-ignore
  //   failoverPublisher['deserializer'].dseria = mockDeserializer(validEvent)

  //   await failoverPublisher.publish(validEvent)
  //   await failoverPublisher.publish(invalidEvent as any)

  //   const events = await failoverPublisher.consume()
  //   expect(events).toHaveLength(1)
  //   expect(events[0]).toEqual(validEvent)
  // })
})
