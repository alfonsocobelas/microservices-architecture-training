/* eslint-disable @typescript-eslint/no-explicit-any */
import { setWorldConstructor } from '@cucumber/cucumber'
import { MyWorld } from '@libs/testing/entrypoints/step-definitions/shared/world'
import { EntityMapper } from './entity-mapper'

setWorldConstructor(function (options: any) {
  const world = new MyWorld(options)
  world.entityMapper = EntityMapper
  return world
})
