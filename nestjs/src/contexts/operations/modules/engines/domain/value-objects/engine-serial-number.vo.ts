import { StringValueObject } from 'src/contexts/shared/domain/value-objects/string-value-object'
import { normalizeString } from 'src/contexts/shared/utils/normalize'
import { ENGINE_CONSTRAINTS as LIMITS } from '../engine-constants'
import { EngineError } from '../engine-errors'

export class EngineSerialNumber extends StringValueObject {
  protected static fieldName = 'Serial number'

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): EngineSerialNumber {
    const normalized = normalizeString(value)
    this.validate(normalized)
    return new EngineSerialNumber(normalized)
  }

  private static validate(value: string): void {
    this.ensureIsString(value)

    if (value.length < LIMITS.SERIAL_NUMBER.MIN_LENGTH) {
      throw new EngineError(`Serial number must be at least ${LIMITS.SERIAL_NUMBER.MIN_LENGTH} characters`)
    }

    if (value.length > LIMITS.SERIAL_NUMBER.MAX_LENGTH) {
      throw new EngineError(`Serial number must be less than or equal to ${LIMITS.SERIAL_NUMBER.MAX_LENGTH} characters`)
    }
  }
}
