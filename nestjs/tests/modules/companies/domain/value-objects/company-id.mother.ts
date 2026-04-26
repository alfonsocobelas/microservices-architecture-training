import { CompanyId } from 'src/contexts/shared/domain/value-objects/companies/company-id.vo'
import { UuidV7Mother } from '../../../shared/domain/mothers/uuidV7.mother'

export class CompanyIdMother {
  static create(value: string): CompanyId {
    return CompanyId.create(value)
  }

  static random(): CompanyId {
    return this.create(UuidV7Mother.random())
  }
}
