import { SetMetadata } from '@nestjs/common'

export const IS_EVENT_SUBSCRIBER = 'is_event_subscriber'
export const EventSubscriber = () => SetMetadata(IS_EVENT_SUBSCRIBER, true)
