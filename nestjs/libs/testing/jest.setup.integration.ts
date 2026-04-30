// import { faker } from '@faker-js/faker'
// import { DataSource, QueryRunner } from 'typeorm'
// import { Test, TestingModule } from '@nestjs/testing'
// import { GlobalSeed } from './global-seed'
// import { EventBusModule } from '@libs/shared/infrastructure/event-bus/event-bus.module'
// import { CoreConfigModule } from '@libs/shared/infrastructure/config/config.module'
// import { PersistenceModule } from '@libs/shared/infrastructure/persistence/persistence.module'
// import { TestEventBusModule } from './infrastructure/event-bus/test-event-bus.module'
// import { TestRepositoriesModule } from './infrastructure/repositories/test-repositories.module'
// import { TypeOrmEnvironmentArranger } from './infrastructure/arranger/typeorm/typeorm-environment-arranger'
// import { EventBusEnvironmentArranger } from './infrastructure/arranger/event-bus-environment-arranger'
// import { RabbitMQEnvironmentArranger } from './infrastructure/arranger/rabbitmq/rabbitmq-environment-arranger'
// import { PersistenceEnvironmentArranger } from './infrastructure/arranger/persistence-environment-arranger'

// let moduleFixture: TestingModule
// let environmentArranger: PersistenceEnvironmentArranger
// let eventBusEnvironmentArranger: EventBusEnvironmentArranger
// let dataSource: DataSource
// let queryRunner: QueryRunner

// /**
//  * Initialize global Faker seed and log it for reproducibility
//  */
// (function initializeGlobalSeed() {
//   const seedManager = GlobalSeed.getInstance()
//   const masterSeed = seedManager.getMasterSeed()
//   faker.seed(masterSeed)
// })()

// beforeAll(async () => {
//   moduleFixture = await Test.createTestingModule({
//     imports: [CoreConfigModule, EventBusModule, PersistenceModule, TestRepositoriesModule, TestEventBusModule],
//     providers: [
//       { provide: PersistenceEnvironmentArranger, useClass: TypeOrmEnvironmentArranger },
//       { provide: EventBusEnvironmentArranger, useClass: RabbitMQEnvironmentArranger }
//     ]
//   }).compile()

//   const app = moduleFixture.createNestApplication()
//   await app.init()

//   dataSource = moduleFixture.get<DataSource>(DataSource)
//   environmentArranger = moduleFixture.get<PersistenceEnvironmentArranger>(PersistenceEnvironmentArranger)
//   eventBusEnvironmentArranger = moduleFixture.get<EventBusEnvironmentArranger>(EventBusEnvironmentArranger)
// })

// afterAll(async () => {
//   if (environmentArranger) {
//     await environmentArranger.close()
//   } else {
//     console.warn('[JEST INTEGRATION] ⚠️ No environment arranger available to close.')
//   }

//   if (dataSource && dataSource.isInitialized) {
//     await dataSource.destroy()
//   } else {
//     console.warn('[JEST INTEGRATION] ⚠️ No data source available to destroy.')
//   }

//   if (eventBusEnvironmentArranger) {
//     await eventBusEnvironmentArranger.close()
//   } else {
//     console.warn('[JEST INTEGRATION] ⚠️ No event bus environment arranger available to close.')
//   }

//   if (moduleFixture) {
//     await moduleFixture.close()
//   } else {
//     console.warn('[JEST INTEGRATION] ⚠️ No module fixture available to close.')
//   }
// })

// beforeEach(async () => {
//   const currentTestName = expect.getState().currentTestName || 'default-integration-test'
//   const seedManager = GlobalSeed.getInstance()
//   const renewedSeed = seedManager.getReseed(currentTestName)
//   faker.seed(renewedSeed)

//   if (environmentArranger) {
//     await environmentArranger.arrange()
//   }

//   if (dataSource) {
//     queryRunner = dataSource.createQueryRunner()
//     await queryRunner.connect()
//     await queryRunner.startTransaction()
//   }

//   if (eventBusEnvironmentArranger) {
//     await eventBusEnvironmentArranger.arrange()
//   }
// })

// afterEach(async () => {
//   if (queryRunner && queryRunner.isTransactionActive) {
//     await queryRunner.rollbackTransaction()
//     await queryRunner.release()
//   } else if (queryRunner) {
//     await queryRunner.release()
//   } else {
//     console.warn('[JEST INTEGRATION] ⚠️ No query runner available to rollback transaction.')
//   }
// })

// export { environmentArranger, dataSource, queryRunner, moduleFixture }
