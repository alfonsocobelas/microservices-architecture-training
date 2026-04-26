import { GetCompanyOutput } from 'src/contexts/operations/modules/companies/application/dtos/get-company-output.dto'
import { Company } from 'src/contexts/operations/modules/companies/domain/company'

export class GetCompanyOutputMother {
  static fromDomain(company: Company): GetCompanyOutput {
    return {
      id: company.id.value,
      name: company.name.value
    }
  }
}
