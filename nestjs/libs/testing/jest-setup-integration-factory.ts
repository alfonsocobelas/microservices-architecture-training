/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { GlobalSeed } from './global-seed'

export function createIntegrationSetup({ modules, providers = [] } : { modules: any[]; providers?: any[] }) {
  let moduleFixture: TestingModule

  (function initializeGlobalSeed() {
    const seedManager = GlobalSeed.getInstance()
    const masterSeed = seedManager.getMasterSeed()
    faker.seed(masterSeed)
  })()

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: modules,
      providers
    }).compile()

    const app = moduleFixture.createNestApplication()
    await app.init()
  })

  beforeEach(() => {
    const currentTestName = expect.getState().currentTestName || 'default-integration-test'
    const seedManager = GlobalSeed.getInstance()
    const renewedSeed = seedManager.getReseed(currentTestName)
    faker.seed(renewedSeed)
  })

  return {
    getModuleFixture: () => moduleFixture
  }
}
