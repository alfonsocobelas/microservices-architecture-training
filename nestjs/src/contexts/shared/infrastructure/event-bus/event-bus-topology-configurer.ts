import { Injectable, OnModuleInit } from '@nestjs/common'
import { DiscoveryService, Reflector } from '@nestjs/core'
import { EventBus } from '../../domain/event-bus/event-bus'
import { DomainEventSubscribers } from '../../domain/event-bus/domain-event-subscribers'
import { IS_EVENT_SUBSCRIBER } from '../../application/event-bus/event-subscriber.decorator'

@Injectable()
export class EventBusTopologyConfigurer implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly eventBus: EventBus
  ) {}

  async onModuleInit() {
    const subscribers = this.getSubscribers()
    await this.eventBus.addSubscribers(new DomainEventSubscribers(subscribers))
  }

  private getSubscribers() {
    const providers = this.discoveryService.getProviders()

    return providers
      .filter((wrapper) => {
        return wrapper.instance &&
          wrapper.metatype &&
          this.reflector.get(IS_EVENT_SUBSCRIBER, wrapper.metatype)
      })
      .map((wrapper) => wrapper.instance)
  }
}
