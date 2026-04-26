import { Injectable } from '@nestjs/common'
import { EntityNotFoundError } from '@libs/shared/errors'
import { GetCompanyInput } from '../dtos/get-company-input.dto'
import { GetCompanyOutput } from '../dtos/get-company-output.dto'
import { CompanyRepository } from '../../domain/company.repository'
import { CompanyId } from '../../../shared/domain/companies/company-id.vo'

@Injectable()
export class GetCompanyUseCase {
  constructor(
    private readonly repository: CompanyRepository
  ) {}

  async invoke(input: GetCompanyInput): Promise<GetCompanyOutput> {
    const companyId = CompanyId.create(input.id)

    const company = await this.repository.get(companyId)
    if (!company) {
      throw new EntityNotFoundError('Company', companyId.value)
    }

    return company.toPrimitives()
  }
}
