import { IntegerValueObject } from 'src/contexts/shared/domain/value-objects/integer-value-object'
import { AircraftModelError } from '../aircraft-model-errors'
import { AIRCRAFT_MODEL_CONSTRAINTS as LIMITS } from '../aircraft-model-constants'

export class AircraftModelPassengerCapacity extends IntegerValueObject {
  protected static fieldName = 'Passenger capacity'

  private constructor(value: number) {
    super(value)
  }

  static create(value: number): AircraftModelPassengerCapacity {
    this.validate(value)
    return new AircraftModelPassengerCapacity(value)
  }

  private static validate(value: number): void {
    this.ensureIsInteger(value)

    if (value < LIMITS.PASSENGERS.MIN) {
      throw new AircraftModelError(`Passenger capacity must be greater than or equal to ${LIMITS.PASSENGERS.MIN}`)
    }

    if (value > LIMITS.PASSENGERS.MAX) {
      throw new AircraftModelError(`Passenger capacity must be less than or equal to ${LIMITS.PASSENGERS.MAX}`)
    }
  }
}
