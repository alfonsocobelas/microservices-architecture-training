import { RetireAircraftFromFleetUsecase } from 'src/contexts/operations/modules/fleets/application/use-cases/retire-aircraft-from-fleet-usecase.service'
import { RetireAircraftFromFleetInputMother } from '../mothers/retire-aircraft-from-fleet-input.mother'
import { AircraftRepositoryMock } from '../../../aircrafts/mocks/aircraft.repository.mock'
import { FleetRepositoryMock } from '../../mocks/fleet.repository.mock'
import { AircraftBuilder } from '../../../aircrafts/domain/aircraft.builder'
import { FleetBuilder } from '../../domain/fleet.builder'
import { EventBusMock } from '../../../shared/mocks/event-bus.mock'
import { AircraftMother } from '../../../aircrafts/domain/aircraft.mother'

describe('RetireAircraftFromFleetUseCase (unit tests)', () => {
  let fleetRepository: FleetRepositoryMock
  let aircraftRepository: AircraftRepositoryMock
  let useCase: RetireAircraftFromFleetUsecase
  let eventBus: EventBusMock

  beforeEach(() => {
    fleetRepository = new FleetRepositoryMock()
    aircraftRepository = new AircraftRepositoryMock()
    eventBus = new EventBusMock()
    useCase = new RetireAircraftFromFleetUsecase(fleetRepository, aircraftRepository, eventBus)
  })

  it('should retire an aircraft from an existing fleet', async () => {
    // ARRANGE
    const input = RetireAircraftFromFleetInputMother.random()
    const fleet = FleetBuilder.aFleet().withId(input.fleetId).withAircraftIds([input.aircraftId]).build()
    const aircraft = AircraftBuilder.anAircraft().withId(input.aircraftId).withFleetId(input.fleetId).build()

    // GIVEN
    fleetRepository.givenFound(fleet)
    aircraftRepository.givenFound(aircraft)

    // WHEN
    await useCase.invoke(input)

    // THEN
    // const expectedFleet = FleetMother.reconstruct({ ...fleet.toPrimitives(), aircraftIds: [] })
    // const expectedAircraft = AircraftMother.reconstruct({ ...aircraft.toPrimitives(), fleetId: undefined })
    const expectedEvents = [...fleet.pullDomainEvents(), ...aircraft.pullDomainEvents()]

    fleetRepository.assertCalledWith('get', fleet.id)
    aircraftRepository.assertCalledWith('get', aircraft.id)
    aircraftRepository.assertCalledWith('save', aircraft)
    fleetRepository.assertCalledWith('save', fleet)
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should throw EntityNotFoundError if fleet does not exist', async () => {
    // ARRANGE
    const input = RetireAircraftFromFleetInputMother.random()

    // GIVEN
    fleetRepository.givenNotFound()
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Fleet with id "${input.fleetId}" not found.`)

    aircraftRepository.assertNotCalled('save')
    fleetRepository.assertNotCalled('save')
    eventBus.assertNotPublished()
  })

  it('should throw EntityNotFoundError if aircraft does not exist', async () => {
    // GIVEN
    const input = RetireAircraftFromFleetInputMother.random()
    const expectedAircraft = AircraftMother.fromInput({ id: input.aircraftId, fleetId: input.fleetId })
    const expectedFleet = FleetBuilder.aFleet().withId(input.fleetId).withAircraftIds([input.aircraftId]).build()
    fleetRepository.givenFound(expectedFleet)
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`Aircraft with id "${input.aircraftId}" not found.`)

    fleetRepository.assertCalledWith('get', expectedFleet.id)
    aircraftRepository.assertCalledWith('get', expectedAircraft.id)
    aircraftRepository.assertNotCalled('save')
    fleetRepository.assertNotCalled('save')
    eventBus.assertNotPublished()
  })
})
