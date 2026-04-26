import { InvalidArgumentError } from 'src/contexts/shared/errors'

export class OrderBy {
  constructor(readonly value: string) {
    if (!value) {
      throw new InvalidArgumentError(`OrderBy value "${value}" cannot be empty`)
    }
  }

  static create(value: string): OrderBy {
    return new OrderBy(value)
  }
}
