import { RegisterEngineUseCase } from 'src/contexts/operations/modules/engines/application/use-cases/register-engine-usecase.service'
import { RegisterEngineInputMother } from '../mothers/register-engine-input.mother'
import { EngineRepositoryMock } from '../../mocks/engine.repository.mock'
import { EngineMother } from '../../domain/engine.mother'
import { EventBusMock } from '../../../shared/mocks/event-bus.mock'

describe('RegisterEngineUseCase (unit tests)', () => {
  let repository: EngineRepositoryMock
  let useCase: RegisterEngineUseCase
  let eventBus: EventBusMock

  beforeEach(() => {
    repository = new EngineRepositoryMock()
    eventBus = new EventBusMock()
    useCase = new RegisterEngineUseCase(repository, eventBus)
  })

  it('should register a new engine', async () => {
    // GIVEN
    const input = RegisterEngineInputMother.random()
    const expectedEngine = EngineMother.register(input)
    const expectedEvents = expectedEngine.pullDomainEvents()
    repository.givenDoesNotExist()
    repository.whenRegisterSuccess()

    // WHEN
    await useCase.invoke(input)

    // THEN
    repository.assertCalledWith('exists', expectedEngine.serialNumber)
    repository.assertCalledWith('register', expectedEngine)
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should throw AlreadyExistsError if serial number is already taken', async () => {
    // GIVEN
    const input = RegisterEngineInputMother.random()
    repository.givenAlreadyExists()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`Engine with serialNumber "${input.serialNumber}" already exists.`)

    repository.assertNotCalled('register')
    eventBus.assertNotPublished()
  })
})
