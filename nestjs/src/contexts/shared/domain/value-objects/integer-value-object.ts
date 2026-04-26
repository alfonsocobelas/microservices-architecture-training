import { NumberValueObject } from './number-value-object'
import { InvalidArgumentError } from '../../errors'

export class IntegerValueObject extends NumberValueObject {
  constructor(value: number) {
    super(value)
  }

  protected static ensureIsInteger(value: number): void {
    if (!Number.isInteger(value)) {
      throw new InvalidArgumentError(`${this.fieldName} must be an integer`)
    }
  }
}
