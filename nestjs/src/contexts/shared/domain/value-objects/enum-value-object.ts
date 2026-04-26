import { InvalidArgumentError } from 'src/contexts/shared/errors'
import { ValueObject } from './value-object'

export abstract class EnumValueObject<T> extends ValueObject<T> {
  constructor(value: T, readonly validValues: T[]) {
    super(value)
  }

  protected static ensureIsValidEnum<T>(value: T, validValues: T[]): void {
    if (!validValues.includes(value)) {
      throw new InvalidArgumentError(`${this.fieldName} is not a valid enum value`)
    }
  }
}
