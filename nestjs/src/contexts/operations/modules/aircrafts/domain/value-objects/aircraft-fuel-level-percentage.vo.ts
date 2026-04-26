import { IntegerValueObject } from 'src/contexts/shared/domain/value-objects/integer-value-object'
import { AIRCRAFT_CONSTRAINTS as LIMITS } from '../aircraft-constants'
import { AircraftError } from '../aircraft-errors'

export class AircraftFuelLevelPercentage extends IntegerValueObject {
  protected static fieldName = 'Fuel level percentage'

  private constructor(value: number) {
    super(value)
  }

  static create(value: number): AircraftFuelLevelPercentage {
    this.validate(value)
    return new AircraftFuelLevelPercentage(value)
  }

  static min(): AircraftFuelLevelPercentage {
    return new AircraftFuelLevelPercentage(LIMITS.FUEL_LEVEL.MIN)
  }

  static max(): AircraftFuelLevelPercentage {
    return new AircraftFuelLevelPercentage(LIMITS.FUEL_LEVEL.MAX)
  }

  private static validate(value: number): void {
    this.ensureIsInteger(value)

    if (value < LIMITS.FUEL_LEVEL.MIN) {
      throw new AircraftError(`Fuel level percentage must be greater than or equal to ${LIMITS.FUEL_LEVEL.MIN}.`)
    }

    if (value > LIMITS.FUEL_LEVEL.MAX) {
      throw new AircraftError(`Fuel level percentage must be less than or equal to ${LIMITS.FUEL_LEVEL.MAX}.`)
    }
  }
}
