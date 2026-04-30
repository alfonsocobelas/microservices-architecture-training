import { DataSource, QueryRunner } from 'typeorm'
import { TestingModule } from '@nestjs/testing'
import { createIntegrationSetup } from '@libs/testing/jest-setup-integration-factory'
import { TypeOrmEnvironmentArranger } from '@libs/testing/arranger/typeorm/typeorm-environment-arranger'
import { EventBusEnvironmentArranger } from '@libs/testing/arranger/event-bus-environment-arranger'
import { PersistenceEnvironmentArranger } from '@libs/testing/arranger/persistence-environment-arranger'
import { CoreConfigModule } from '../src/modules/shared/infrastructure/config/config.module'
import { PersistenceModule } from '../src/modules/shared/infrastructure/persistence/persistence.module'
import { TestRepositoriesModule } from './infrastructure/repositories/test-repositories.module'

let dataSource: DataSource
let environmentArranger: PersistenceEnvironmentArranger
let eventBusEnvironmentArranger: EventBusEnvironmentArranger
let queryRunner: QueryRunner
let moduleFixture: TestingModule

const { getModuleFixture } = createIntegrationSetup({
  modules: [CoreConfigModule, PersistenceModule, TestRepositoriesModule],
  providers: [
    { provide: PersistenceEnvironmentArranger, useClass: TypeOrmEnvironmentArranger }
  ]
})

// Extended hooks for app-specific resources
beforeAll(async () => {
  moduleFixture = getModuleFixture()
  dataSource = moduleFixture.get<DataSource>(DataSource)
  environmentArranger = moduleFixture.get<PersistenceEnvironmentArranger>(PersistenceEnvironmentArranger)
})

afterAll(async () => {
  if (environmentArranger) {
    await environmentArranger.close()
  } else {
    console.warn('[JEST INTEGRATION] ⚠️ No environment arranger available to close.')
  }

  if (dataSource && dataSource.isInitialized) {
    await dataSource.destroy()
  } else {
    console.warn('[JEST INTEGRATION] ⚠️ No data source available to destroy.')
  }

  if (moduleFixture) {
    await moduleFixture.close()
  } else {
    console.warn('[JEST INTEGRATION] ⚠️ No module fixture available to close.')
  }
})

beforeEach(async () => {
  if (environmentArranger) {
    await environmentArranger.arrange()
  }

  if (dataSource) {
    queryRunner = dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
  }
})

afterEach(async () => {
  if (queryRunner && queryRunner.isTransactionActive) {
    await queryRunner.rollbackTransaction()
    await queryRunner.release()
  } else if (queryRunner) {
    await queryRunner.release()
  } else {
    console.warn('[JEST INTEGRATION] ⚠️ No query runner available to rollback transaction.')
  }
})

export { environmentArranger, dataSource, queryRunner, eventBusEnvironmentArranger, moduleFixture }
