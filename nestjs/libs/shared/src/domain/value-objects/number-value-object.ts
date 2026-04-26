import { ValueObject } from './value-object'
import { InvalidArgumentError } from '../../errors'

export abstract class NumberValueObject extends ValueObject<number> {
  constructor(value: number) {
    NumberValueObject.ensureIsNumber(value)
    super(value)
  }

  protected static ensureIsNumber(value: number): void {
    if (isNaN(value)) {
      throw new InvalidArgumentError(`${this.fieldName} must be a valid number`)
    }

    if (typeof value !== 'number') {
      throw new InvalidArgumentError(`${this.fieldName} must be a number`)
    }
  }
}
