import { StringValueObject } from '../value-objects/string-value-object'

export class FilterField extends StringValueObject {
  constructor(value: string) {
    super(value)
  }

  static create(value: string): FilterField {
    return new FilterField(value)
  }
}
