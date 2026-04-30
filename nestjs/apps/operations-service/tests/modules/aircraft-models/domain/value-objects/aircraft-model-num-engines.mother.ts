import { IntegerMother } from '@libs/testing'
import { AIRCRAFT_MODEL_CONSTRAINTS as LIMITS } from '../../../../../src/modules/aircraft-models/domain/aircraft-model-constants'
import { AircraftModelNumEngines } from '../../../../../src/modules/aircraft-models/domain/value-objects/aircraft-model-num-engines.vo'

export class AircraftModelNumEnginesMother {
  static create(value: number): AircraftModelNumEngines {
    return AircraftModelNumEngines.create(value)
  }

  static random(): AircraftModelNumEngines {
    return this.create(IntegerMother.random({ min: LIMITS.ENGINES.MIN, max: LIMITS.ENGINES.MAX }))
  }
}
