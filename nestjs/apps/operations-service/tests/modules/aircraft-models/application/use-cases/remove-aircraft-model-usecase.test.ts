import { aircraftsOfModel } from 'src/contexts/operations/modules/aircrafts/domain/specifications/aircrafts-of-model.specification'
import { RemoveAircraftModelUseCase } from 'src/contexts/operations/modules/aircraft-models/application/use-cases/remove-aircraft-model-usecase.service'
import { RemoveAircraftModelInputMother } from '../dtos/remove-aircraft-model-input.mother'
import { AircraftModelMother } from '../../domain/aircraft-model.mother'
import { AircraftModelRepositoryMock } from '../../mocks/aircraft-model.repository.mock'
import { AircraftRepositoryMock } from '../../../aircrafts/mocks/aircraft.repository.mock'
import { EventBusMock } from '../../../shared/mocks/event-bus.mock'

const ZERO_AIRCRAFTS_COUNT = 0

describe('RemoveAircraftModelUseCase (unit tests)', () => {
  let modelRepository: AircraftModelRepositoryMock
  let aircraftRespository: AircraftRepositoryMock
  let eventBus: EventBusMock
  let useCase: RemoveAircraftModelUseCase

  beforeEach(() => {
    modelRepository = new AircraftModelRepositoryMock()
    aircraftRespository = new AircraftRepositoryMock()
    eventBus = new EventBusMock()
    useCase = new RemoveAircraftModelUseCase(modelRepository, aircraftRespository, eventBus)
  })

  it('should delete an existing aircraft model by code', async () => {
    // ARRANGE
    const input = RemoveAircraftModelInputMother.random()
    const expectedModel = AircraftModelMother.fromInput(input)
    const expectedEvents = expectedModel.pullDomainEvents()
    const aircraftCount = ZERO_AIRCRAFTS_COUNT

    // GIVEN
    modelRepository.givenFound(expectedModel)
    aircraftRespository.givenCount(aircraftCount)

    // WHEN
    await useCase.invoke(input)

    // THEN
    modelRepository.assertCalledWith('remove', expectedModel.id)
    aircraftRespository.assertCalledWithSpecification('count', aircraftsOfModel(expectedModel.id))
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should throw EntityNotFoundError if model does not exist', async () => {
    // ARRANGE
    const input = RemoveAircraftModelInputMother.random()
    const expectedModel = AircraftModelMother.fromInput(input)

    // GIVEN
    modelRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`AircraftModel with id "${input.id}" not found.`)

    modelRepository.assertCalledWith('get', expectedModel.id)
    aircraftRespository.assertCalledWithSpecification('count', aircraftsOfModel(expectedModel.id))
    modelRepository.assertNotCalled('remove')
  })
})
