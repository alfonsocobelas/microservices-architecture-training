import { IntegerValueObject } from 'src/contexts/shared/domain/value-objects/integer-value-object'
import { AircraftModelError } from '../aircraft-model-errors'
import { AIRCRAFT_MODEL_CONSTRAINTS as LIMITS } from '../aircraft-model-constants'

export class AircraftModelNumEngines extends IntegerValueObject {
  protected static fieldName = 'Number of engines'

  private constructor(value: number) {
    super(value)
  }

  static create(value: number): AircraftModelNumEngines {
    this.validate(value)
    return new AircraftModelNumEngines(value)
  }

  // invariants
  private static validate(value: number): void {
    this.ensureIsInteger(value)

    if (value < LIMITS.ENGINES.MIN) {
      throw new AircraftModelError(`Number of engines must be greater than or equal to ${LIMITS.ENGINES.MIN}`)
    }

    if (value > LIMITS.ENGINES.MAX) {
      throw new AircraftModelError(`Number of engines must be less than or equal to ${LIMITS.ENGINES.MAX}`)
    }
  }
}
