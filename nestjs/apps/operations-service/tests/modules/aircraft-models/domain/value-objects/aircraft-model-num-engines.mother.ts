import { AircraftModelNumEngines } from 'src/contexts/operations/modules/aircraft-models/domain/value-objects/aircraft-model-num-engines.vo'
import { IntegerMother } from '../../../shared/domain/mothers/integer.mother'
import { AIRCRAFT_MODEL_CONSTRAINTS as LIMITS } from 'src/contexts/operations/modules/aircraft-models/domain/aircraft-model-constants'

export class AircraftModelNumEnginesMother {
  static create(value: number): AircraftModelNumEngines {
    return AircraftModelNumEngines.create(value)
  }

  static random(): AircraftModelNumEngines {
    return this.create(IntegerMother.random({ min: LIMITS.ENGINES.MIN, max: LIMITS.ENGINES.MAX }))
  }
}
