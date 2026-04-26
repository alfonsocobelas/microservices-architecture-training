import { CompanyId } from 'src/contexts/shared/domain/value-objects/companies/company-id.vo'
import { CompanyName } from './value-objects/company-name.vo'

export type CompanyCreateProps = Omit<CompanyPrimitiveProps, 'createdAt' | 'updatedAt' | 'deletedAt'>

export interface CompanyPrimitiveProps {
  id: string
  name: string
}

export interface CompanyAggregateProps {
  id: CompanyId
  name: CompanyName
}
