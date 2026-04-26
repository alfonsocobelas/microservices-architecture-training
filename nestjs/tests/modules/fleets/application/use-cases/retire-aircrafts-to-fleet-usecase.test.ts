import { RetireAircraftsFromFleetUsecase } from 'src/contexts/operations/modules/fleets/application/use-cases/retire-aircrafts-from-fleet-usecase.service'
import { RetireAircraftsFromFleetInputMother } from '../mothers/retire-aircrafts-from-fleet-input.mother'
import { FleetBuilder } from '../../domain/fleet.builder'
import { AircraftBuilder } from '../../../aircrafts/domain/aircraft.builder'
import { EventBusMock } from '../../../shared/mocks/event-bus.mock'
import { FleetRepositoryMock } from '../../mocks/fleet.repository.mock'
import { AircraftRepositoryMock } from '../../../aircrafts/mocks/aircraft.repository.mock'

describe('RetireAircraftsFromFleetUseCase (unit tests)', () => {
  let fleetRepository: FleetRepositoryMock
  let aircraftRepository: AircraftRepositoryMock
  let useCase: RetireAircraftsFromFleetUsecase
  let eventBus: EventBusMock

  beforeEach(() => {
    fleetRepository = new FleetRepositoryMock()
    aircraftRepository = new AircraftRepositoryMock()
    eventBus = new EventBusMock()
    useCase = new RetireAircraftsFromFleetUsecase(fleetRepository, aircraftRepository, eventBus)
  })

  it('should retire multiple aircrafts from an existing fleet', async () => {
    // ARRANGE
    const input = RetireAircraftsFromFleetInputMother.random()
    const fleet = FleetBuilder.aFleet().withId(input.fleetId).withAircraftIds(input.aircraftIds).build()
    const aircrafts = input.aircraftIds.map((id) =>
      AircraftBuilder.anAircraft().withId(id).withFleetId(input.fleetId).build()
    )

    // GIVEN
    fleetRepository.givenFound(fleet)
    aircraftRepository.givenAircraftsFound(aircrafts)

    // WHEN
    await useCase.invoke(input)

    // THEN
    const expectectAircraftIds = aircrafts.map(aircraft => aircraft.id)
    const expectedEvents = [...fleet.pullDomainEvents(), ...aircrafts.flatMap(a => a.pullDomainEvents())]

    fleetRepository.assertCalledWith('get', fleet.id)
    aircraftRepository.assertCalledWith('find', expectectAircraftIds)
    aircraftRepository.assertCalledWith('save', aircrafts)
    fleetRepository.assertCalledWith('save', fleet)
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should throw EntityNotFoundError if fleet does not exist', async () => {
    // GIVEN
    const input = RetireAircraftsFromFleetInputMother.random()
    fleetRepository.givenNotFound()
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Fleet with id "${input.fleetId}" not found.`)
    aircraftRepository.assertNotCalled('save')
    fleetRepository.assertNotCalled('save')
    eventBus.assertNotPublished()
  })

  it('should throw InvalidArgumentError if no aircrafts are found with the provided IDs', async () => {
    // ARRANGE
    const input = RetireAircraftsFromFleetInputMother.random()
    const expectedAircraftIds = input.aircraftIds.map(id => AircraftBuilder.anAircraft().withId(id).build().id)
    const expectedFleet = FleetBuilder.aFleet().withId(input.fleetId).withAircraftIds(input.aircraftIds).build()

    // GIVEN
    fleetRepository.givenFound(expectedFleet)
    aircraftRepository.givenNoAircraftsFound()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow('No aircrafts found with the provided IDs.')

    aircraftRepository.assertCalledWith('find', expectedAircraftIds)
    aircraftRepository.assertNotCalled('save')
    fleetRepository.assertNotCalled('save')
    eventBus.assertNotPublished()
  })

  it('should throw InvalidArgumentError if some aircraft IDs are not found', async () => {
    // ARRANGE
    const input = RetireAircraftsFromFleetInputMother.random()
    const fleet = FleetBuilder.aFleet().withId(input.fleetId).withAircraftIds(input.aircraftIds).build()
    const expectedAircraftIds = input.aircraftIds.map(id => AircraftBuilder.anAircraft().withId(id).build().id)
    const foundAircrafts = input.aircraftIds.slice(0, -1).map((id) =>
      AircraftBuilder.anAircraft().withId(id).withFleetId(input.fleetId).build()
    )

    // GIVEN
    fleetRepository.givenFound(fleet)
    aircraftRepository.givenAircraftsFound(foundAircrafts)

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow('Some aircraft IDs were not found')

    aircraftRepository.assertCalledWith('find', expectedAircraftIds)
    aircraftRepository.assertNotCalled('save')
    fleetRepository.assertNotCalled('save')
    eventBus.assertNotPublished()
  })
})
