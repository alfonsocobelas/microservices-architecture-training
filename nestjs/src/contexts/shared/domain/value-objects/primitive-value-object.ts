import { ValueObject } from './value-object'

type Primitives = string | number | boolean

export abstract class PrimitiveValueObject<T extends Primitives> extends ValueObject<T> {
  constructor(value: T) {
    super(value)
  }

  // protected abstract validate(value: T): void
}
