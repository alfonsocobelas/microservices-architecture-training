import { StringValueObject } from 'src/contexts/shared/domain/value-objects/string-value-object'
import { normalizeString } from 'src/contexts/shared/utils/normalize'
import { AircraftModelError } from '../aircraft-model-errors'
import { AIRCRAFT_MODEL_CONSTRAINTS as LIMITS } from '../aircraft-model-constants'

export class AircraftModelCode extends StringValueObject {
  protected static fieldName = 'Aircraft model code'

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): AircraftModelCode {
    const normalized = normalizeString(value)
    this.validate(normalized)
    return new AircraftModelCode(normalized)
  }

  // todo: que hacemos con los errores? como se gestionan los errores en los value objects?
  // hay que crear una clase personalizada por ejemplo par este value object AircraftModelCodeError?
  // o una generica del aggregado nos vale como la que tenemos AircraftModelError, o una mas generica
  // todavia como InvalidArgumentError?
  private static validate(value: string): void {
    this.ensureIsString(value)

    if (value.length < LIMITS.CODE.MIN_LENGTH) {
      throw new AircraftModelError(`Code must be at least ${LIMITS.CODE.MIN_LENGTH} characters`)
    }

    if (value.length > LIMITS.CODE.MAX_LENGTH) {
      throw new AircraftModelError(`Code must be less than or equal to ${LIMITS.CODE.MAX_LENGTH} characters`)
    }
  }
}
