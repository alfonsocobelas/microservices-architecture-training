import amqp from 'amqplib'
import { createCucumberIntegrationSetup, CucumberIntegrationSetupOptions } from '@libs/testing/entrypoints/step-definitions/shared/cucumber-integration-setup-factory'
import { PersistenceEnvironmentArranger } from '@libs/testing/arranger/persistence-environment-arranger'
import { TypeOrmEnvironmentArranger } from '@libs/testing/arranger/typeorm/typeorm-environment-arranger'
import { EventBusEnvironmentArranger } from '@libs/testing/arranger/event-bus-environment-arranger'
import { RabbitMQEnvironmentArranger } from '@libs/testing/arranger/rabbitmq/rabbitmq-environment-arranger'
import { MaintenanceServiceModule } from '../../../../../src/maintenance-service.module'
import { setupApp } from '../../../../../src/setup.app'
import { BeforeAll } from '@cucumber/cucumber'

export async function setupEventBusTopology() {
  const conn = await amqp.connect('amqp://localhost:5672')
  const channel = await conn.createChannel()
  await channel.assertExchange('events', 'topic', { durable: true })
  await channel.close()
  await conn.close()
}

BeforeAll(async () => {
  await setupEventBusTopology()
})

const options: CucumberIntegrationSetupOptions = {
  appModule: MaintenanceServiceModule,
  setupApp,
  providers: [
    { provide: PersistenceEnvironmentArranger, useClass: TypeOrmEnvironmentArranger },
    { provide: EventBusEnvironmentArranger, useClass: RabbitMQEnvironmentArranger }
  ]
}

createCucumberIntegrationSetup(options)
