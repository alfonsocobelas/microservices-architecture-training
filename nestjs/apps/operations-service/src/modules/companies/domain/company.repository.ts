import { Nullable } from '@libs/shared/types'
import { Criteria } from '@libs/shared/domain/query/criteria'
import { CompanyId } from '../../shared/domain/companies/company-id.vo'
import { CompanyName } from './value-objects/company-name.vo'
import { Company } from './company'

export abstract class CompanyRepository {
  abstract register(company: Company): Promise<void>
  abstract save(company: Company | Company[]): Promise<void>
  abstract get(companyId: CompanyId): Promise<Nullable<Company>>
  abstract matching(criteria: Criteria): Promise<Company[]>
  abstract exists(name: CompanyName): Promise<boolean>
  abstract remove(companyId: CompanyId): Promise<void>
}
