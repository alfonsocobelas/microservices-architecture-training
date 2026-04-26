import { IntegerValueObject } from 'src/contexts/shared/domain/value-objects/integer-value-object'
import { AIRCRAFT_CONSTRAINTS as LIMITS } from '../aircraft-constants'
import { AircraftError } from '../aircraft-errors'

export class AircraftTotalFlightHours extends IntegerValueObject {
  protected static fieldName = 'Total flight hours'

  private constructor(value: number) {
    super(value)
  }

  static create(value: number): AircraftTotalFlightHours {
    this.validate(value)
    return new AircraftTotalFlightHours(value)
  }

  static min(): AircraftTotalFlightHours {
    return new AircraftTotalFlightHours(LIMITS.FLIGHT_HOURS.MIN)
  }

  static max(): AircraftTotalFlightHours {
    return new AircraftTotalFlightHours(LIMITS.FLIGHT_HOURS.MAX)
  }

  private static validate(value: number): void {
    this.ensureIsInteger(value)

    if (value < LIMITS.FLIGHT_HOURS.MIN) {
      throw new AircraftError(`Total flight hours must be greater than or equal to ${LIMITS.FLIGHT_HOURS.MIN}.`)
    }

    if (value > LIMITS.FLIGHT_HOURS.MAX) {
      throw new AircraftError(`Total flight hours must be less than or equal to ${LIMITS.FLIGHT_HOURS.MAX}.`)
    }
  }
}

