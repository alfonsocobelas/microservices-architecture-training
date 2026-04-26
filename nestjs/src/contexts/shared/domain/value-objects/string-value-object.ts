import { ValueObject } from './value-object'
import { InvalidArgumentError } from '../../errors'

export abstract class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  protected static ensureIsString(value: string): void {
    if (!value || !value.trim().length) {
      throw new InvalidArgumentError(`${this.fieldName} cannot be empty string`)
    }

    if (typeof value !== 'string') {
      throw new InvalidArgumentError(`${this.fieldName} must be a string`)
    }
  }
}
