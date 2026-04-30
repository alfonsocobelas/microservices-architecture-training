import { TypeOrmCompanyRepository } from '../../../../src/modules/companies/infrastructure/persistence/typeorm/typeorm-company.repository'
import { moduleFixture } from '../../../jest-setup-integration'
import { CompanyBuilder } from '../../../modules/companies/domain/company.builder'

export async function setupCompany(): Promise<string> {
  const company = CompanyBuilder.aCompany().build()

  const repository = moduleFixture.get<TypeOrmCompanyRepository>(TypeOrmCompanyRepository)
  await repository.save(company)

  return company.id.value
}
