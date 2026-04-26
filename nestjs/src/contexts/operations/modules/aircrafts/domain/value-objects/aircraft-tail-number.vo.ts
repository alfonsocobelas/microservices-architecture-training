import { StringValueObject } from 'src/contexts/shared/domain/value-objects/string-value-object'
import { AIRCRAFT_CONSTRAINTS as LIMITS } from '../aircraft-constants'
import { AircraftError } from '../aircraft-errors'

export class AircraftTailNumber extends StringValueObject {
  protected static fieldName = 'Tail number'

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): AircraftTailNumber {
    const normalized = value.trim().toUpperCase()
    this.validate(normalized)
    return new AircraftTailNumber(normalized)
  }

  private static validate(value: string): void {
    this.ensureIsString(value)

    if (value.length < LIMITS.TAIL_NUMBER.MIN_LENGTH) {
      throw new AircraftError(`Tail number must be at least ${LIMITS.TAIL_NUMBER.MIN_LENGTH} characters`)
    }

    if (value.length > LIMITS.TAIL_NUMBER.MAX_LENGTH) {
      throw new AircraftError(`Tail number must be less than or equal to ${LIMITS.TAIL_NUMBER.MAX_LENGTH} characters`)
    }
  }
}
