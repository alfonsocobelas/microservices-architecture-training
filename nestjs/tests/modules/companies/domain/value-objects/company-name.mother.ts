import { CompanyName } from 'src/contexts/operations/modules/companies/domain/value-objects/company-name.vo'
import { StringMother } from '../../../shared/domain/mothers/string.mother'
import { COMPANY_CONSTRAINTS as LIMITS } from 'src/contexts/operations/modules/companies/domain/company-constants'

export class CompanyNameMother {
  static create(value: string): CompanyName {
    return CompanyName.create(value)
  }

  static random(): CompanyName {
    return this.create(StringMother.random({ minLength: LIMITS.NAME.MIN_LENGTH, maxLength: LIMITS.NAME.MAX_LENGTH }))
  }
}
