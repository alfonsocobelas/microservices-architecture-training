import { StringValueObject } from 'src/contexts/shared/domain/value-objects/string-value-object'
import { AircraftModelError } from '../aircraft-model-errors'
import { AIRCRAFT_MODEL_CONSTRAINTS as LIMITS } from '../aircraft-model-constants'

export class AircraftModelName extends StringValueObject {
  protected static fieldName = 'Aircraft model name'

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): AircraftModelName {
    this.validate(value)
    return new AircraftModelName(value)
  }

  private static validate(value: string): void {
    this.ensureIsString(value)

    if (value.length < LIMITS.NAME.MIN_LENGTH) {
      throw new AircraftModelError(`Name must be at least ${LIMITS.NAME.MIN_LENGTH} characters`)
    }

    if (value.length > LIMITS.NAME.MAX_LENGTH) {
      throw new AircraftModelError(`Name must be less than or equal to ${LIMITS.NAME.MAX_LENGTH} characters`)
    }
  }
}
