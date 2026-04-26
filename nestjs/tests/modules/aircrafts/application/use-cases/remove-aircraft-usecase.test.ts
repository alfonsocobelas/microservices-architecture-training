import { RemoveAircraftUseCase } from 'src/contexts/operations/modules/aircrafts/application/use-cases/remove-aircraft-usecase.service'
import { RemoveAircraftInputMother } from '../mothers/remove-aircraft-input.mother'
import { AircraftRepositoryMock } from '../../mocks/aircraft.repository.mock'
import { AircraftMother } from '../../domain/aircraft.mother'
import { EventBusMock } from '../../../shared/mocks/event-bus.mock'

describe('RemoveAircraftUseCase (unit tests)', () => {
  let aircraftRepository: AircraftRepositoryMock
  let eventBus: EventBusMock
  let useCase: RemoveAircraftUseCase

  beforeEach(() => {
    aircraftRepository = new AircraftRepositoryMock()
    eventBus = new EventBusMock()
    useCase = new RemoveAircraftUseCase(aircraftRepository, eventBus)
  })

  it('should delete an existing aircraft by id', async () => {
    // GIVEN
    const input = RemoveAircraftInputMother.random()
    const expectedAircraft = AircraftMother.fromInput(input)
    const expectedEvents = expectedAircraft.pullDomainEvents()
    aircraftRepository.givenFound(expectedAircraft)

    // WHEN
    await useCase.invoke(input)
    aircraftRepository.whenRemoveSuccess()

    // THEN
    aircraftRepository.assertCalledWith('get', expectedAircraft.id)
    aircraftRepository.assertCalledWith('remove', expectedAircraft)
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should throw EntityNotFoundError if aircraft does not exist', async () => {
    // GIVEN
    const input = RemoveAircraftInputMother.random()
    const expectedAircraft = AircraftMother.fromInput(input)
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`Aircraft with id "${input.id}" not found.`)

    aircraftRepository.assertCalledWith('get', expectedAircraft.id)
    aircraftRepository.assertNotCalled('remove')
    eventBus.assertNotPublished()
  })
})

