import { v7 as uuidv7 } from 'uuid'

import { EngineBuilder } from './engine.builder'
import { repeat } from '@libs/testing'
import { Engine } from '../../../../src/modules/engines/domain/engine'
import { EngineStatusEnum } from '../../../../src/modules/engines/domain/engine-enums'
import { EnginePrimitiveProps, EngineCreateProps } from '../../../../src/modules/engines/domain/engine-types'

export class EngineMother {
  static fromInput(input: Partial<EnginePrimitiveProps>): Engine {
    return EngineBuilder.anEngine().withProps(input as Partial<EnginePrimitiveProps>).build()
  }

  static register(overrides?: Partial<EngineCreateProps>): Engine {
    return EngineBuilder.anEngine().withProps(overrides).create()
  }

  static reconstruct(overrides?: Partial<EnginePrimitiveProps>): Engine {
    return EngineBuilder.anEngine().withProps(overrides).build()
  }

  static random(): Engine {
    return EngineBuilder.anEngine().build()
  }

  static randomList(count: number = 5): Engine[] {
    return repeat(() => this.random(), count)
  }

  static operational() {
    return EngineBuilder.anEngine().build()
  }

  static installed(engineId: string = uuidv7(), aircraftId: string = uuidv7()) {
    return EngineBuilder
      .anEngine()
      .withId(engineId)
      .withAircraftId(aircraftId)
      .withIsInstalled(true)
      .build()
  }

  static free(engineId: string = uuidv7(), aircraftId: string = uuidv7()) {
    return EngineBuilder
      .anEngine()
      .withId(engineId)
      .withAircraftId(aircraftId)
      .withStatus(EngineStatusEnum.OPERATIONAL)
      .withIsInstalled(false)
      .build()
  }

  static damaged() {
    return EngineBuilder
      .anEngine()
      .withStatus(EngineStatusEnum.MAINTENANCE)
      .withHealth(40)
      .build()
  }
}
