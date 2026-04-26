import { withTailNumber } from 'src/contexts/operations/modules/aircrafts/domain/specifications/aircraft-with-tail-number.specification'
import { RegisterAircraftUseCase } from 'src/contexts/operations/modules/aircrafts/application/use-cases/register-aircraft-usecase.service'
import { RegisterAircraftInputMother } from '../mothers/register-aircraft-input.mother'
import { AircraftModelBuilder } from '../../../aircraft-models/domain/aircraft-model.builder'
import { AircraftMother } from '../../domain/aircraft.mother'
import { AircraftModelRepositoryMock } from '../../../aircraft-models/mocks/aircraft-model.repository.mock'
import { AircraftRepositoryMock } from '../../mocks/aircraft.repository.mock'
import { EventBusMock } from '../../../shared/mocks/event-bus.mock'

describe('RegisterAircraftUseCase (unit tests)', () => {
  let aircraftRepository: AircraftRepositoryMock
  let modelRepository: AircraftModelRepositoryMock
  let eventBus: EventBusMock
  let useCase: RegisterAircraftUseCase

  beforeEach(() => {
    aircraftRepository = new AircraftRepositoryMock()
    modelRepository = new AircraftModelRepositoryMock()
    eventBus = new EventBusMock()
    useCase = new RegisterAircraftUseCase(aircraftRepository, modelRepository, eventBus)
  })

  it('should register a new aircraft', async () => {
    // ARRANGE
    const input = RegisterAircraftInputMother.random()
    const expectedAircraft = AircraftMother.register(input)
    const expectedModel = AircraftModelBuilder.aModel().withId(input.modelId).build()
    const expectedEvents = expectedAircraft.pullDomainEvents()

    // GIVEN
    modelRepository.givenFound(expectedModel)
    aircraftRepository.givenDoesNotExist()

    // WHEN
    await useCase.invoke(input)
    aircraftRepository.whenRegisterSuccess()

    // THEN
    modelRepository.assertCalledWith('get', expectedModel.id)
    aircraftRepository.assertCalledWithSpecification('exists', withTailNumber(expectedAircraft.tailNumber))
    aircraftRepository.assertCalledWith('register', expectedAircraft)
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should throw EntityNotFoundError if aircraft model does not exist', async () => {
    // ARRANGE
    const input = RegisterAircraftInputMother.random()
    const expectedAircraft = AircraftMother.fromInput(input)
    const expectedModel = AircraftModelBuilder.aModel().withId(input.modelId).build()

    // GIVEN
    modelRepository.givenNotFound()
    aircraftRepository.givenDoesNotExist()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`AircraftModel with id "${input.modelId}" not found.`)

    aircraftRepository.assertCalledWithSpecification('exists', withTailNumber(expectedAircraft.tailNumber))
    modelRepository.assertCalledWith('get', expectedModel.id)
    aircraftRepository.assertNotCalled('register')
    eventBus.assertNotPublished()
  })

  it('should throw AlreadyExistsError if tail number is already taken', async () => {
    // ARRANGE
    const input = RegisterAircraftInputMother.random()
    const expectedAircraft = AircraftMother.fromInput(input)
    const expectedModel = AircraftModelBuilder.aModel().withId(input.modelId).build()

    // GIVEN
    modelRepository.givenFound(expectedModel)
    aircraftRepository.givenAlreadyExists()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`Aircraft with tailNumber "${input.tailNumber}" already exists.`)

    aircraftRepository.assertCalledWithSpecification('exists', withTailNumber(expectedAircraft.tailNumber))
    modelRepository.assertCalledWith('get', expectedModel.id)
    aircraftRepository.assertNotCalled('register')
    eventBus.assertNotPublished()
  })
})
