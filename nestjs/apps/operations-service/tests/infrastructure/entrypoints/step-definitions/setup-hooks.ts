import { TypeOrmEnvironmentArranger } from '@libs/testing/arranger/typeorm/typeorm-environment-arranger'
import { EventBusEnvironmentArranger } from '@libs/testing/arranger/event-bus-environment-arranger'
import { RabbitMQEnvironmentArranger } from '@libs/testing/arranger/rabbitmq/rabbitmq-environment-arranger'
import { PersistenceEnvironmentArranger } from '@libs/testing/arranger/persistence-environment-arranger'
import { createCucumberIntegrationSetup, CucumberIntegrationSetupOptions } from '@libs/testing/entrypoints/step-definitions/shared/cucumber-integration-setup-factory'
import { AppModule } from '../../../../src/app.module'
import { setupApp } from '../../../../src/setup.app'

const options: CucumberIntegrationSetupOptions = {
  appModule: AppModule,
  setupApp,
  providers: [
    { provide: PersistenceEnvironmentArranger, useClass: TypeOrmEnvironmentArranger },
    { provide: EventBusEnvironmentArranger, useClass: RabbitMQEnvironmentArranger }
  ]
}

createCucumberIntegrationSetup(options)
