import { StringMother } from '@libs/testing'
import { CompanyName } from '../../../../../src/modules/companies/domain/value-objects/company-name.vo'
import { COMPANY_CONSTRAINTS as LIMITS } from '../../../../../src/modules/companies/domain/company-constants'

export class CompanyNameMother {
  static create(value: string): CompanyName {
    return CompanyName.create(value)
  }

  static random(): CompanyName {
    return this.create(StringMother.random({ minLength: LIMITS.NAME.MIN_LENGTH, maxLength: LIMITS.NAME.MAX_LENGTH }))
  }
}
