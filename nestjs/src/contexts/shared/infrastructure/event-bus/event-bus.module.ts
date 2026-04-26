import { ConfigModule } from '@nestjs/config'
import { Global, Module } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'
import { EventBus } from 'src/contexts/shared/domain/event-bus/event-bus'
import { RabbitMqEventBus } from './rabbitmq/rabbitmq-event-bus'
import { RabbitMqTopology } from './rabbitmq/rabbitmq-topology'
import { RabbitMqConnection } from './rabbitmq/rabbitmq-connection'
import { RabbitMQqueueFormatter } from './rabbitmq/rabbitmq-queue-formatter'
import { DomainEventDeserializer } from './domain-event/domain-event-deserializer'
import { EventBusTopologyConfigurer } from './event-bus-topology-configurer'
import { DomainEventFailoverPublisher } from '../../domain/event-bus/domain-event-failover-publisher.repository'
import { TypeOrmDomainEventFailoverPublisher } from './domain-event/failover-publisher/typeorm-domain-event-failover-publisher.'

@Global()
@Module({
  imports: [
    ConfigModule,
    DiscoveryModule
  ],
  providers: [
    RabbitMqTopology,
    RabbitMqEventBus,
    RabbitMqConnection,
    RabbitMQqueueFormatter,
    DomainEventDeserializer,
    EventBusTopologyConfigurer,
    {
      provide: EventBus,
      useExisting: RabbitMqEventBus
    },
    {
      provide: DomainEventFailoverPublisher,
      useClass: TypeOrmDomainEventFailoverPublisher
    }
  ],
  exports: [
    EventBus,
    RabbitMqConnection,
    DomainEventDeserializer,
    DomainEventFailoverPublisher
  ]
})
export class EventBusModule {}
