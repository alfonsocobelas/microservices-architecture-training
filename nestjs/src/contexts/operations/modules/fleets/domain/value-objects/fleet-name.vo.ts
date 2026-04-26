import { StringValueObject } from 'src/contexts/shared/domain/value-objects/string-value-object'
import { FleetError } from '../fleet-errors'
import { FLEET_CONSTRAINTS as LIMITS } from '../fleet-constants'

export class FleetName extends StringValueObject {
  protected static fieldName = 'Fleet name'

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): FleetName {
    this.validate(value)
    return new FleetName(value)
  }

  private static validate(value: string): void {
    this.ensureIsString(value)

    if (value.length < LIMITS.NAME.MIN_LENGTH) {
      throw new FleetError(`Name must be at least ${LIMITS.NAME.MIN_LENGTH} characters`)
    }

    if (value.length > LIMITS.NAME.MAX_LENGTH) {
      throw new FleetError(`Name must be less than or equal to ${LIMITS.NAME.MAX_LENGTH} characters`)
    }
  }
}
