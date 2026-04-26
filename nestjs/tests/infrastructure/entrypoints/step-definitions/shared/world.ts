import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber'
import { Nullable } from 'src/contexts/shared/types'
import { EventBusEnvironmentArranger } from '../../../arranger/event-bus-environment-arranger'
import { PersistenceEnvironmentArranger } from '../../../arranger/persistence-environment-arranger'

// Context class to share state between steps
export class MyWorld extends World {
  app?: INestApplication
  persistenceArranger?: PersistenceEnvironmentArranger
  eventBusArranger?: EventBusEnvironmentArranger
  request?: request.Test
  response?: request.Response

  queryParams: Record<string, unknown> = {}
  currentFilters: { field: string; operator: string; value: string }[] = []
  currentOrders: { orderBy: string; orderType: 'asc' | 'desc' }[] = []
  savedCursor: Nullable<string> = null

  constructor(options: IWorldOptions) {
    super(options)
  }
}

// Register context to be available in all step definitions
setWorldConstructor(MyWorld)
