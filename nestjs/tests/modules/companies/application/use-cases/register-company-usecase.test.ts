import { RegisterCompanyUseCase } from 'src/contexts/operations/modules/companies/application/use-cases/register-company-usecase.service'
import { RegisterCompanyInputMother } from '../mothers/register-company-input.mother'
import { CompanyMother } from '../../domain/company.mother'
import { CompanyRepositoryMock } from '../../mocks/company.repository.mock'
import { EventBusMock } from '../../../shared/mocks/event-bus.mock'

describe('RegisterCompanyUseCase (unit tests)', () => {
  let repository: CompanyRepositoryMock
  let eventBus: EventBusMock
  let useCase: RegisterCompanyUseCase

  beforeEach(() => {
    repository = new CompanyRepositoryMock()
    eventBus = new EventBusMock()
    useCase = new RegisterCompanyUseCase(repository, eventBus)
  })

  it('should register a new company', async () => {
    // GIVEN
    const input = RegisterCompanyInputMother.random()
    const expectedCompany = CompanyMother.fromInput(input)
    const expectedEvents = expectedCompany.pullDomainEvents()
    repository.givenDoesNotExist()

    // WHEN
    await useCase.invoke(input)
    repository.whenRegisterSuccess()

    // THEN
    repository.assertCalledWith('exists', expectedCompany.name)
    repository.assertCalledWith('register', expectedCompany)
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should throw AlreadyExistsError if name is already taken', async () => {
    // GIVEN
    const input = RegisterCompanyInputMother.random()
    repository.givenAlreadyExists()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Company with name "${input.name}" already exists.`)
    repository.assertNotCalled('register')
  })
})
