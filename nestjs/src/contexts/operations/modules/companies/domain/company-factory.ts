import { CompanyId } from 'src/contexts/shared/domain/value-objects/companies/company-id.vo'
import { RegisterCompanyInput } from '../application/dtos/register-company-input.dto'
import { CompanyAggregateProps } from './company-types'
import { CompanyName } from './value-objects/company-name.vo'

export class CompanyInputMapper {
  static toDomain(raw: RegisterCompanyInput): CompanyAggregateProps {
    return {
      id: CompanyId.create(raw.id),
      name: CompanyName.create(raw.name)
    }
  }
}
