import { Company } from 'src/contexts/operations/modules/companies/domain/company'
import { Nullable } from 'src/contexts/shared/types'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { CompanyId } from 'src/contexts/shared/domain/value-objects/companies/company-id.vo'
import { CompanyName } from 'src/contexts/operations/modules/companies/domain/value-objects/company-name.vo'
import { CompanyRepository } from 'src/contexts/operations/modules/companies/domain/company.repository'
import { MockRepository } from '../../shared/mocks/mock-repository'

export class CompanyRepositoryMock
  extends MockRepository<Company>
  implements CompanyRepository
{
  register(company: Company): Promise<void> {
    return this.getMock('register')(company)
  }

  get(companyId: CompanyId): Promise<Nullable<Company>> {
    return this.getMock('get')(companyId)
  }

  save(company: Company | Company[]): Promise<void> {
    return this.getMock('save')(company)
  }

  exists(name: CompanyName): Promise<boolean> {
    return this.getMock('exists')(name)
  }

  matching(criteria: Criteria): Promise<Company[]> {
    return this.getMock('matching')(criteria)
  }

  remove(companyId: CompanyId): Promise<void> {
    return this.getMock('remove')(companyId)
  }

  // Helpers
  givenFound(company: Company): void {
    this.setMockResult('get', Promise.resolve(company))
  }

  givenNotFound(): void {
    this.setMockResult('get', Promise.resolve(null))
  }

  givenAlreadyExists(): void {
    this.setMockResult('exists', Promise.resolve(true))
  }

  givenDoesNotExist(): void {
    this.setMockResult('exists', Promise.resolve(false))
  }

  givenMatching(companies: Company[]): void {
    this.setMockResult('matching', Promise.resolve(companies))
  }

  whenRegisterSuccess(): void {
    this.setMockResult('register', Promise.resolve())
  }

  whenSaveSuccess(): void {
    this.setMockResult('save', Promise.resolve())
  }
}
