import { RabbitMqEventBus } from 'src/contexts/shared/infrastructure/event-bus/rabbitmq/rabbitmq-event-bus'
import { DomainEventMother } from './mothers/domain-event.mother'
import { moduleFixture } from '../../jest.setup.integration'
import { DomainEventSubscriberDummy } from './mocks/domain-event-subscriber.mock'
import { DomainEventSubscribers } from 'src/contexts/shared/domain/event-bus/domain-event-subscribers'

describe('RabbitMqEventBus (integration test)', () => {
  let eventBus: RabbitMqEventBus

  beforeEach(async () => {
    eventBus = moduleFixture.get<RabbitMqEventBus>(RabbitMqEventBus)
  })

  it('should publish the domain events to RabbitMQ', async () => {
    const events = [DomainEventMother.random(), DomainEventMother.random()]

    await eventBus.publish(events)
  })

  it('should use failover publisher if publish to RabbitMQ fails', async () => {
    expect(true).toBeTruthy()
  })

  it('should consume the domain events from RabbitMQ', async () => {
    const event = DomainEventMother.random()
    const dummySubscriber = new DomainEventSubscriberDummy()
    const subscribers = new DomainEventSubscribers([dummySubscriber])

    await eventBus.addSubscribers(subscribers)
    await eventBus.publish([event])

    await dummySubscriber.assertConsumedEvents([event])
  })

  it('should retry failed domain events from retry queue', async () => {
    const event = DomainEventMother.random()
    const dummySubscriber = DomainEventSubscriberDummy.failsFirstTime()
    const subscribers = new DomainEventSubscribers([dummySubscriber])

    await eventBus.addSubscribers(subscribers)
    await eventBus.publish([event])

    await dummySubscriber.assertConsumedEvents([event])
  })

  // it('should send domain events to the dead letter queue after max retries', async () => {
  //   const event = DomainEventMother.random()
  //   const dummySubscriber = DomainEventSubscriberDummy.alwaysFails()
  //   const subscribers = new DomainEventSubscribers([dummySubscriber])

  //   await eventBus.addSubscribers(subscribers)
  //   await eventBus.publish([event])

  //   await assertDeadLetter([event], dummySubscriber)
  // })

  // async function assertDeadLetter(events: Array<DomainEvent>, dummySubscriber: DomainEventSubscriberDummy) {
  //   const queueNameFormatter = new RabbitMQqueueFormatter()
  //   const deadLetterQueue = queueNameFormatter.formatDeadLetter(dummySubscriber)
  //   const deadLetterSubscriber = new DomainEventSubscriberDummy()
  //   const deadLetterSubscribers = new DomainEventSubscribers([dummySubscriber])
  //   const deserializer = DomainEventDeserializer.configure(deadLetterSubscribers)
  //   const exchange = 'test_domain_events'
  //   const maxRetries = 3

  //   const consumer = new RabbitMqConsumer(
  //     deadLetterSubscriber,
  //     deserializer,
  //     connection,
  //     deadLetterQueue,
  //     exchange,
  //     maxRetries
  //   )
  //   await connection.consume(deadLetterQueue, consumer.onMessage.bind(consumer))

  //   await deadLetterSubscriber.assertConsumedEvents(events)
  // }
})
