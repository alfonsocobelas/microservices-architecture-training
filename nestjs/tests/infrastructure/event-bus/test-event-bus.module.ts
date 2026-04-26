import { Module } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'
import { RabbitMqTopology } from 'src/contexts/shared/infrastructure/event-bus/rabbitmq/rabbitmq-topology'
import { RabbitMqConnection } from 'src/contexts/shared/infrastructure/event-bus/rabbitmq/rabbitmq-connection'
import { RabbitMQqueueFormatter } from 'src/contexts/shared/infrastructure/event-bus/rabbitmq/rabbitmq-queue-formatter'
import { TypeOrmDomainEventFailoverPublisher } from 'src/contexts/shared/infrastructure/event-bus/domain-event/failover-publisher/typeorm-domain-event-failover-publisher.'
import { EventBusTopologyConfigurer } from 'src/contexts/shared/infrastructure/event-bus/event-bus-topology-configurer'

@Module({
  imports: [
    DiscoveryModule
  ],
  providers: [
    RabbitMqTopology,
    RabbitMqConnection,
    RabbitMQqueueFormatter,
    EventBusTopologyConfigurer,
    TypeOrmDomainEventFailoverPublisher
  ],
  exports: [
    RabbitMqTopology,
    RabbitMqConnection,
    RabbitMQqueueFormatter,
    EventBusTopologyConfigurer,
    TypeOrmDomainEventFailoverPublisher
  ]
})
export class TestEventBusModule {}
