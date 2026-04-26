import { DomainEvent, DomainEventClass } from '@libs/shared/domain/event-bus/domain-event'
import { DomainEventSubscriber } from '@libs/shared/domain/event-bus/domain-event-subscriber'
import { DomainEventDummy } from '../mothers/domain-event.mother'

export class DomainEventSubscriberDummy implements DomainEventSubscriber<DomainEventDummy> {
  private events: Array<DomainEvent>
  private failsFirstTime = false
  private alwaysFails = false
  private alreadyFailed = false

  constructor(params?: { failsFirstTime?: Boolean; alwaysFails?: Boolean }) {
    if (params?.failsFirstTime) {
      this.failsFirstTime = true
    }
    if (params?.alwaysFails) {
      this.alwaysFails = true
    }

    this.events = []
  }

  static failsFirstTime() {
    return new DomainEventSubscriberDummy({ failsFirstTime: true })
  }

  static alwaysFails() {
    return new DomainEventSubscriberDummy({ alwaysFails: true })
  }

  subscribedTo(): DomainEventClass[] {
    return [DomainEventDummy]
  }

  async on(domainEvent: DomainEventDummy): Promise<void> {
    if (this.alwaysFails) {
      throw new Error()
    }

    if (!this.alreadyFailed && this.failsFirstTime) {
      this.alreadyFailed = true
      throw new Error()
    }

    this.events.push(domainEvent)
  }

  async assertConsumedEvents(events: Array<DomainEvent>) {
    return new Promise((resolve: Function, reject: Function) => {
      setTimeout(() => {
        try {
          expect(this.events.length).toEqual(events.length)
          expect(this.events).toEqual(events)
          resolve()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          reject(error)
        }
      }, 400)
    })
  }
}
