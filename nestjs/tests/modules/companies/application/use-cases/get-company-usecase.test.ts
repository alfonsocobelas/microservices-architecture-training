import { GetCompanyUseCase } from 'src/contexts/operations/modules/companies/application/use-cases/get-company-usecase.service'
import { GetCompanyInputMother } from '../mothers/get-company-input.mother'
import { GetCompanyOutputMother } from '../mothers/get-company-output.mother'
import { CompanyMother } from '../../domain/company.mother'
import { CompanyRepositoryMock } from '../../mocks/company.repository.mock'

describe('GetCompanyUseCase (unit tests)', () => {
  let repository: CompanyRepositoryMock
  let useCase: GetCompanyUseCase

  beforeEach(() => {
    repository = new CompanyRepositoryMock()
    useCase = new GetCompanyUseCase(repository)
  })

  it('should get an existing company by id', async () => {
    // GIVEN
    const input = GetCompanyInputMother.random()
    const expectedCompany = CompanyMother.fromInput(input)
    const expectedOutput = GetCompanyOutputMother.fromDomain(expectedCompany)
    repository.givenFound(expectedCompany)

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    expect(result).toEqual(expectedOutput)
    repository.assertCalledWith('get', expectedCompany.id)
  })

  it('should throw EntityNotFoundError if company does not exist', async () => {
    // GIVEN
    const input = GetCompanyInputMother.random()
    const expectedCompany = CompanyMother.fromInput(input)
    repository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`Company with id "${input.id}" not found.`)

    repository.assertCalledWith('get', expectedCompany.id)
  })
})
