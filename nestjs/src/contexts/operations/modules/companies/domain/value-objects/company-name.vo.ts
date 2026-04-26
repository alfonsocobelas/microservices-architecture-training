import { StringValueObject } from 'src/contexts/shared/domain/value-objects/string-value-object'
import { CompanyError } from '../company-errors'
import { COMPANY_CONSTRAINTS as LIMITS } from '../company-constants'

export class CompanyName extends StringValueObject {
  protected static fieldName = 'Company name'

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): CompanyName {
    this.ensureIsValid(value)
    return new CompanyName(value)
  }

  private static ensureIsValid(value: string): void {
    this.ensureIsString(value)

    if (value.length < LIMITS.NAME.MIN_LENGTH) {
      throw new CompanyError(`Name must be at least ${LIMITS.NAME.MIN_LENGTH} characters`)
    }

    if (value.length > LIMITS.NAME.MAX_LENGTH) {
      throw new CompanyError(`Name must be less than or equal to ${LIMITS.NAME.MAX_LENGTH} characters`)
    }
  }
}
