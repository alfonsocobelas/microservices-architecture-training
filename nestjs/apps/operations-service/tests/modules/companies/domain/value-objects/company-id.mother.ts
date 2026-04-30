import { UuidV7Mother } from '@libs/testing'
import { CompanyId } from '../../../../../src/modules/shared/domain/companies/company-id.vo'

export class CompanyIdMother {
  static create(value: string): CompanyId {
    return CompanyId.create(value)
  }

  static random(): CompanyId {
    return this.create(UuidV7Mother.random())
  }
}
