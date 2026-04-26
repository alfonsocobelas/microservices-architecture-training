import { v7 as uuidv7 } from 'uuid'
import { RegisterIssueUseCase } from 'src/contexts/maintenance/modules/issues/application/use-cases/register-issue-usecase.service'
import { withCode } from 'src/contexts/maintenance/modules/issues/domain/specifications/issue-with-code.specification'
import { IssueMother } from '../../domain/issue.mother'
import { RegisterIssueInputMother } from '../mothers/register-issue-input.mother'
import { EventBusMock } from '../../../shared/mocks/event-bus.mock'
import { IssueRepositoryMock } from '../../mocks/issue.repository.mock'

describe('RegisterIssueUseCase (unit tests)', () => {
  let issueRepository: IssueRepositoryMock
  let useCase: RegisterIssueUseCase
  let eventBus: EventBusMock

  beforeEach(() => {
    issueRepository = new IssueRepositoryMock()
    eventBus = new EventBusMock()
    useCase = new RegisterIssueUseCase(issueRepository, eventBus)
  })

  it('should register a new engine issue', async () => {
    // GIVEN
    const engineId = uuidv7()
    const input = RegisterIssueInputMother.engine(engineId)
    const expectedIssue = IssueMother.fromInput(input)
    const expectedEvents = expectedIssue.pullDomainEvents()
    issueRepository.givenDoesNotExist()

    // WHEN
    await useCase.invoke(input)
    issueRepository.whenRegisterSuccess()

    // THEN
    issueRepository.assertCalledWithSpecification('exists', withCode(expectedIssue.code))
    issueRepository.assertCalledWith('register', expectedIssue)
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should register a new avionics issue', async () => {
    // GIVEN
    const aircraftId = uuidv7()
    const input = RegisterIssueInputMother.avionics(aircraftId)
    const expectedIssue = IssueMother.fromInput(input)
    const expectedEvents = expectedIssue.pullDomainEvents()
    issueRepository.givenDoesNotExist()

    // WHEN
    await useCase.invoke(input)
    issueRepository.whenRegisterSuccess()

    // THEN
    issueRepository.assertCalledWithSpecification('exists', withCode(expectedIssue.code))
    issueRepository.assertCalledWith('register', expectedIssue)
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should throw AlreadyExistsError if an issue with the same code already exists', async () => {
    // GIVEN
    const input = RegisterIssueInputMother.engine()
    const issue = IssueMother.fromInput(input)
    issueRepository.givenAlreadyExists()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`Issue with code "${input.code}" already exists.`)

    issueRepository.assertCalledWithSpecification('exists', withCode(issue.code))
    issueRepository.assertNotCalled('register')
    eventBus.assertNotPublished()
  })
})
