import { TypeOrmCompanyRepository } from 'src/contexts/operations/modules/companies/infrastructure/persistence/typeorm/typeorm-company.repository'
import { CompanyBuilder } from '../../../modules/companies/domain/company.builder'
import { moduleFixture } from '../../../jest.setup.integration'

export async function setupCompany(): Promise<string> {
  const company = CompanyBuilder.aCompany().build()

  const repository = moduleFixture.get<TypeOrmCompanyRepository>(TypeOrmCompanyRepository)
  await repository.save(company)

  return company.id.value
}
