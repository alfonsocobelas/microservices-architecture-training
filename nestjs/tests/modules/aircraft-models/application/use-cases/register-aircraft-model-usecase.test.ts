import { RegisterAircraftModelUseCase } from 'src/contexts/operations/modules/aircraft-models/application/use-cases/register-aircraft-model-usecase.service'
import { AircraftModelMother } from '../../domain/aircraft-model.mother'
import { RegisterAircraftModelInputMother } from '../dtos/register-aircraft-model-intput.mother'
import { EventBusMock } from '../../../shared/mocks/event-bus.mock'
import { AircraftModelRepositoryMock } from '../../mocks/aircraft-model.repository.mock'

describe('RegisterAircraftModelUseCase (unit test)', () => {
  let repository: AircraftModelRepositoryMock
  let eventBus: EventBusMock
  let useCase: RegisterAircraftModelUseCase

  beforeEach(() => {
    repository = new AircraftModelRepositoryMock()
    eventBus = new EventBusMock()
    useCase = new RegisterAircraftModelUseCase(repository, eventBus)
  })

  it('should register a new aircraft model', async () => {
    // GIVEN
    const input = RegisterAircraftModelInputMother.random()
    const expectedModel = AircraftModelMother.register(input)
    const expectedEvents = expectedModel.pullDomainEvents()
    repository.givenDoesNotExist()

    // WHEN
    await useCase.invoke(input)
    repository.whenRegisterSuccess()

    // THEN
    repository.assertCalledWith('exists', expectedModel.code)
    repository.assertCalledWith('register', expectedModel)
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should throw AlreadyExistsError if code is already taken', async () => {
    // GIVEN
    const input = RegisterAircraftModelInputMother.random()
    repository.givenAlreadyExists()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`AircraftModel with code "${input.code}" already exists.`)

    repository.assertNotCalled('register')
    eventBus.assertNotPublished()
  })
})
