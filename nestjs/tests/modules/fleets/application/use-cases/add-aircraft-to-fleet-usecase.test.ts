import { AddAircraftToFleetUsecase } from 'src/contexts/operations/modules/fleets/application/use-cases/add-aircraft-to-fleet-usecase.service'
import { AddAircraftToFleetInputMother } from '../mothers/add-aircraft-to-fleet-input.mother'
import { AircraftRepositoryMock } from '../../../aircrafts/mocks/aircraft.repository.mock'
import { FleetRepositoryMock } from '../../mocks/fleet.repository.mock'
import { FleetBuilder } from '../../domain/fleet.builder'
import { AircraftBuilder } from '../../../aircrafts/domain/aircraft.builder'
import { EventBusMock } from '../../../shared/mocks/event-bus.mock'
import { FleetIdMother } from '../../domain/value-objects/fleet-id.mother'
import { AircraftIdMother } from '../../../shared/domain/mothers/aircraftId.mother'
import { AircraftMother } from '../../../aircrafts/domain/aircraft.mother'

describe('AddAircraftToFleetUseCase (unit tests)', () => {
  let fleetRepository: FleetRepositoryMock
  let aircraftRepository: AircraftRepositoryMock
  let useCase: AddAircraftToFleetUsecase
  let eventBus: EventBusMock

  beforeEach(() => {
    aircraftRepository = new AircraftRepositoryMock()
    fleetRepository = new FleetRepositoryMock()
    eventBus = new EventBusMock()
    useCase = new AddAircraftToFleetUsecase(fleetRepository, aircraftRepository, eventBus)
  })

  it('should add aircraft to an existing fleet', async () => {
    // GIVEN
    const input = AddAircraftToFleetInputMother.random()
    const expectedAircraft = AircraftBuilder.anAircraft().withId(input.aircraftId).build()
    const expectedFleet = FleetBuilder.aFleet().withId(input.fleetId).build()
    const expectedEvents = [...expectedFleet.pullDomainEvents(), ...expectedAircraft.pullDomainEvents()]
    fleetRepository.givenFound(expectedFleet)
    aircraftRepository.givenFound(expectedAircraft)

    // WHEN
    await useCase.invoke(input)

    // THEN
    fleetRepository.assertCalledWith('get', expectedFleet.id)
    aircraftRepository.assertCalledWith('get', expectedAircraft.id)
    aircraftRepository.assertCalledWith('save', expectedAircraft)
    fleetRepository.assertCalledWith('save', expectedFleet)
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should throw EntityNotFoundError if fleet does not exist', async () => {
    // GIVEN
    const input = AddAircraftToFleetInputMother.random()
    fleetRepository.givenNotFound()
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`Fleet with id "${input.fleetId}" not found.`)

    aircraftRepository.assertNotCalled('save')
    fleetRepository.assertNotCalled('save')
    eventBus.assertNotPublished()
  })

  it('should throw EntityNotFoundError if aircraft does not exist', async () => {
    // GIVEN
    const input = AddAircraftToFleetInputMother.random()
    const expectedAircraft = AircraftMother.fromInput({ id: input.aircraftId })
    const expectedFleet = FleetBuilder.aFleet().withId(input.fleetId).build()
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

  it('should throw error if aircraft is already in the fleet', async () => {
    // GIVEN
    const input = AddAircraftToFleetInputMother.random()
    const expectedFleet = FleetBuilder.aFleet().withId(input.fleetId).withAircraftIds([input.aircraftId]).build()
    const expectedAircraft = AircraftBuilder.anAircraft().withId(input.aircraftId).withFleetId(input.fleetId).build()
    fleetRepository.givenFound(expectedFleet)
    aircraftRepository.givenFound(expectedAircraft)

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`Aircraft is already assigned to fleet ${input.fleetId}.`)

    fleetRepository.assertCalledWith('get', FleetIdMother.create(input.fleetId))
    aircraftRepository.assertCalledWith('get', AircraftIdMother.create(input.aircraftId))
    aircraftRepository.assertNotCalled('save')
    fleetRepository.assertNotCalled('save')
    eventBus.assertNotPublished()
  })
})
