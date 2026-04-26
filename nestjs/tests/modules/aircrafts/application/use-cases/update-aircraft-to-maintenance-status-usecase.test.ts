import { UpdateAircraftToMaintenanceStatusUseCase } from 'src/contexts/operations/modules/aircrafts/application/use-cases/update-aircraft-to-maintenance-status-usecase.service'
import { UpdateAircraftToMaintenanceStatusInputMother } from '../mothers/update-aircraft-to-maintenance-status-input.mother'
import { AircraftIdMother } from '../../../shared/domain/mothers/aircraftId.mother'
import { AircraftMother } from '../../domain/aircraft.mother'
import { EventBusMock } from '../../../shared/mocks/event-bus.mock'
import { AircraftRepositoryMock } from '../../mocks/aircraft.repository.mock'

describe('UpdateAircraftToMaintenanceStatusUseCase (unit tests)', () => {
  let repository: AircraftRepositoryMock
  let useCase: UpdateAircraftToMaintenanceStatusUseCase
  let eventBus: EventBusMock

  beforeEach(() => {
    repository = new AircraftRepositoryMock()
    eventBus = new EventBusMock()
    useCase = new UpdateAircraftToMaintenanceStatusUseCase(repository, eventBus)
  })

  it('should update aircraft status to maintenance', async () => {
    const input = UpdateAircraftToMaintenanceStatusInputMother.random()
    const expectedAircraft = AircraftMother.activeInFlight(input.id)
    const expectedEvents = expectedAircraft.pullDomainEvents()

    // GIVEN
    repository.givenFound(expectedAircraft)

    // WHEN
    await useCase.invoke(input)
    repository.whenUpdateStatusSuccess()

    // THEN
    repository.assertCalledWith('get', expectedAircraft.id)
    repository.assertCalledWith('updateStatus', expectedAircraft.id, expectedAircraft.status)
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should throw EntityNotFoundError if aircraft does not exist', async () => {
    // GIVEN
    const input = UpdateAircraftToMaintenanceStatusInputMother.random()
    const expectedAircraftId = AircraftIdMother.create(input.id)
    repository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`Aircraft with id "${input.id}" not found.`)

    repository.assertCalledWith('get', expectedAircraftId)
    repository.assertNotCalled('updateStatus')
    eventBus.assertNotPublished()
  })
})
