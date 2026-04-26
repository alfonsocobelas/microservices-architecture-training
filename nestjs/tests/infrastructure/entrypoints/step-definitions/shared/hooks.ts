import * as sinon from 'sinon'
import { DataSource } from 'typeorm'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from '@cucumber/cucumber'
import { AppModule } from 'src/app.module'
import { setupApp } from 'src/setup.app'
import { MyWorld } from './world'
import { TypeOrmEnvironmentArranger } from '../../../arranger/typeorm/typeorm-environment-arranger'
import { EventBusEnvironmentArranger } from '../../../arranger/event-bus-environment-arranger'
import { RabbitMQEnvironmentArranger } from '../../../arranger/rabbitmq/rabbitmq-environment-arranger'
import { PersistenceEnvironmentArranger } from '../../../arranger/persistence-environment-arranger'

let application: INestApplication
let moduleFixture: TestingModule
let clock: sinon.SinonFakeTimers
let persistenceEnvironmentArranger: PersistenceEnvironmentArranger
let eventBusEnvironmentArranger: EventBusEnvironmentArranger
setDefaultTimeout(30000)

BeforeAll(async () => {
  moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
    providers: [
      { provide: PersistenceEnvironmentArranger, useClass: TypeOrmEnvironmentArranger },
      { provide: EventBusEnvironmentArranger, useClass: RabbitMQEnvironmentArranger }
    ]
  }).compile()

  application = moduleFixture.createNestApplication()
  setupApp(application)
  await application.init()

  const dataSource = moduleFixture.get<DataSource>(DataSource)
  persistenceEnvironmentArranger = moduleFixture.get<PersistenceEnvironmentArranger>(PersistenceEnvironmentArranger)
  eventBusEnvironmentArranger = moduleFixture.get<EventBusEnvironmentArranger>(EventBusEnvironmentArranger)

  if (!dataSource.isInitialized) {
    await dataSource.initialize()
  }
})

AfterAll(async () => {
  if (persistenceEnvironmentArranger) {
    await persistenceEnvironmentArranger.close()
  }

  if (eventBusEnvironmentArranger) {
    await eventBusEnvironmentArranger.close()
  }

  if (application) {
    await application.close()
  }
})

Before(async function (this: MyWorld) {
  this.app = application
  this.persistenceArranger = persistenceEnvironmentArranger
  this.eventBusArranger = eventBusEnvironmentArranger

  if (!this.persistenceArranger) {
    throw new Error('PersistenceEnvironmentArranger not found in container')
  }

  if (!this.eventBusArranger) {
    throw new Error('EventBusEnvironmentArranger not found in container')
  }

  await this.persistenceArranger.arrange()
  await this.eventBusArranger.arrange()

  // reset shared context
  this.queryParams = {}
  this.currentFilters = []
  this.currentOrders = []
  this.savedCursor = null
})

Before({ tags: '@fixedTime' }, function (this: MyWorld) {
  clock = sinon.useFakeTimers(new Date('2024-03-16T10:00:00Z').getTime())
})

After({ tags: '@fixedTime' }, function (this: MyWorld) {
  if (clock) {
    clock.restore()
  }
})
