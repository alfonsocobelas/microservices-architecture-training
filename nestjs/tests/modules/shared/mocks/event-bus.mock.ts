import { EventBus } from '@libs/shared/domain/event-bus/event-bus'
import { DomainEvent } from '@libs/shared/domain/event-bus/domain-event'
import { DomainEventSubscribers } from '@libs/shared/domain/event-bus/domain-event-subscribers'

export class EventBusMock implements EventBus {
  private publishSpy = jest.fn()

  public async publish(events: DomainEvent[]) {
    this.publishSpy(events)
  }

  public async addSubscribers(subscribers: DomainEventSubscribers): Promise<void> {}

  // public assertLastPublishedEventIs(expectedEvent: DomainEvent) {
  //   const publishSpyCalls = this.publishSpy.mock.calls
  //   expect(publishSpyCalls.length).toBeGreaterThan(0)

  //   const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1]
  //   const lastPublishedEvent = lastPublishSpyCall[0][0]

  //   const expected = this.getDataFromDomainEvent(expectedEvent)
  //   const published = this.getDataFromDomainEvent(lastPublishedEvent)

  //   expect(expected).toMatchObject(published)
  // }

  // private getDataFromDomainEvent(event: DomainEvent) {
  //   const { eventId, occurredOn, ...attributes } = event

  //   return attributes
  // }

  public assertPublishedEvents(expectedEvents: DomainEvent[]) {
    const publishSpyCalls = this.publishSpy.mock.calls
    expect(publishSpyCalls.length).toBeGreaterThan(0)

    const publishedEvents = publishSpyCalls.flatMap(call => call[0])

    expectedEvents.forEach(expectedEvent => {
      const expected = this.getDataFromDomainEvent(expectedEvent)
      const match = publishedEvents.some(publishedEvent => {
        const published = this.getDataFromDomainEvent(publishedEvent)
        return expect(published).toMatchObject(expected) === undefined
      })
      expect(match).toBe(true)
    })
  }

  private getDataFromDomainEvent(event: DomainEvent) {
    const { eventId, occurredOn, ...attributes } = event
    return attributes
  }

  public assertNotPublished(): void {
    expect(this.publishSpy).not.toHaveBeenCalled()
  }

  public whenPublishSuccess(): void {
    this.publishSpy.mockResolvedValue(undefined)
  }

  public whenPublishFailure(error: Error): void {
    this.publishSpy.mockRejectedValue(error)
  }
}
