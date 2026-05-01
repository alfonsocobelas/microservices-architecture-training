/* eslint-disable @typescript-eslint/no-explicit-any */
import * as sinon from 'sinon'
import { DataSource } from 'typeorm'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, Type } from '@nestjs/common'
import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from '@cucumber/cucumber'
import { EventBusEnvironmentArranger } from '@libs/testing/arranger/event-bus-environment-arranger'
import { PersistenceEnvironmentArranger } from '@libs/testing/arranger/persistence-environment-arranger'
import { MyWorld } from './world'

export type CucumberIntegrationSetupOptions = {
  appModule: Type<any>,
  setupApp: (app: INestApplication) => INestApplication,
  providers?: any[],
}

export function createCucumberIntegrationSetup({
  appModule,
  setupApp,
  providers = []
}: CucumberIntegrationSetupOptions) {
  let application: INestApplication
  let moduleFixture: TestingModule
  let clock: sinon.SinonFakeTimers
  let persistenceEnvironmentArranger: PersistenceEnvironmentArranger
  let eventBusEnvironmentArranger: EventBusEnvironmentArranger

  setDefaultTimeout(3000)

  BeforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [appModule],
      providers
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

  return {
    getApp: () => application,
    getModuleFixture: () => moduleFixture
  }
}
