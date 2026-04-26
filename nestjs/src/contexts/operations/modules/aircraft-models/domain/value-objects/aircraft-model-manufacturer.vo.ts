import { StringValueObject } from 'src/contexts/shared/domain/value-objects/string-value-object'
import { AircraftModelError } from '../aircraft-model-errors'
import { AIRCRAFT_MODEL_CONSTRAINTS as LIMITS } from '../aircraft-model-constants'

export class AircraftModelManufacturer extends StringValueObject {
  protected static fieldName = 'Manufacturer'

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): AircraftModelManufacturer {
    this.validate(value)
    return new AircraftModelManufacturer(value)
  }

  private static validate(value: string): void {
    this.ensureIsString(value)

    if (value.length < LIMITS.MANUFACTURER.MIN_LENGTH) {
      throw new AircraftModelError(`Manufacturer must be at least ${LIMITS.MANUFACTURER.MIN_LENGTH} characters`)
    }

    if (value.length > LIMITS.MANUFACTURER.MAX_LENGTH) {
      throw new AircraftModelError(`Manufacturer must be less than or equal to ${LIMITS.MANUFACTURER.MAX_LENGTH} characters`)
    }
  }
}
