import { RegisterFleetUseCase } from 'src/contexts/operations/modules/fleets/application/use-cases/register-fleet-usecase.service'
import { withName } from 'src/contexts/operations/modules/fleets/domain/specifications/fleet-with-name.specification'
import { FleetMother } from '../../domain/fleet.mother'
import { AircraftBuilder } from '../../../aircrafts/domain/aircraft.builder'
import { RegisterFleetInputMother } from '../mothers/register-fleet-input.mother'
import { EventBusMock } from '../../../shared/mocks/event-bus.mock'
import { FleetRepositoryMock } from '../../mocks/fleet.repository.mock'
import { AircraftRepositoryMock } from '../../../aircrafts/mocks/aircraft.repository.mock'

describe('RegisterFleetUseCase (unit tests)', () => {
  let fleetRepository: FleetRepositoryMock
  let aircraftRepository: AircraftRepositoryMock
  let useCase: RegisterFleetUseCase
  let eventBus: EventBusMock

  beforeEach(() => {
    fleetRepository = new FleetRepositoryMock()
    aircraftRepository = new AircraftRepositoryMock()
    eventBus = new EventBusMock()
    useCase = new RegisterFleetUseCase(fleetRepository, aircraftRepository, eventBus)
  })

  it('should register a new fleet', async () => {
    // GIVEN
    const input = RegisterFleetInputMother.random()
    const expectedFleet = FleetMother.fromInput(input)
    const expectedAircrafts = input.aircraftIds.map(id => AircraftBuilder.anAircraft().withId(id).build())
    const expectedAircraftIds = expectedAircrafts.map(a => a.id)
    const expectedEvents = expectedFleet.pullDomainEvents()
    fleetRepository.givenDoesNotExist()
    aircraftRepository.givenAircraftsFound(expectedAircrafts)

    // WHEN
    await useCase.invoke(input)
    fleetRepository.whenRegisterSuccess()
    aircraftRepository.whenSaveSuccess()

    // THEN
    fleetRepository.assertCalledWithSpecification('exists', withName(expectedFleet.name))
    aircraftRepository.assertCalledWith('find', expectedAircraftIds)
    fleetRepository.assertCalledWith('register', expectedFleet)
    aircraftRepository.assertCalledWith('save', expectedAircrafts)
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should throw AlreadyExistsError if fleet with same name already exists', async () => {
    // GIVEN
    const input = RegisterFleetInputMother.random()
    const expectedFleet = FleetMother.fromInput(input)
    const expectedAircrafts = input.aircraftIds.map(id => AircraftBuilder.anAircraft().withId(id).build())
    const expectedAircraftIds = expectedAircrafts.map(aircraft => aircraft.id)
    aircraftRepository.givenAircraftsFound(expectedAircrafts)
    fleetRepository.givenAlreadyExists()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`Fleet with name "${input.name}" already exists.`)

    aircraftRepository.assertCalledWith('find', expectedAircraftIds)
    fleetRepository.assertCalledWithSpecification('exists', withName(expectedFleet.name))
    fleetRepository.assertNotCalled('register')
    aircraftRepository.assertNotCalled('save')
  })

  it('should throw InvalidArgumentError if no aircrafts are found with the provided IDs', async () => {
    // ARRANGE
    const input = RegisterFleetInputMother.random()
    const expectedFleet = FleetMother.fromInput(input)
    const expectedAircraftIds = input.aircraftIds.map(id => AircraftBuilder.anAircraft().withId(id).build().id)

    // GIVEN
    fleetRepository.givenDoesNotExist()
    aircraftRepository.givenNoAircraftsFound()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow('No aircrafts found with the provided IDs.')

    fleetRepository.assertCalledWithSpecification('exists', withName(expectedFleet.name))
    aircraftRepository.assertCalledWith('find', expectedAircraftIds)
    fleetRepository.assertNotCalled('register')
    aircraftRepository.assertNotCalled('save')
  })

  it('should throw InvalidArgumentError if some aircraft IDs were not found', async () => {
    // ARRANGE
    const input = RegisterFleetInputMother.random()
    const expectedFleet = FleetMother.fromInput(input)
    const expectedAircrafts = input.aircraftIds.map(a => AircraftBuilder.anAircraft().withId(a).build())
    const expectedAircraftIds = expectedAircrafts.map(a => a.id)
    const foundAircrafts = expectedAircrafts.slice(0, -1).map(aircraft => aircraft)

    // GIVEN
    fleetRepository.givenDoesNotExist()
    aircraftRepository.givenAircraftsFound(foundAircrafts)

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow('Some aircraft IDs were not found.')

    fleetRepository.assertCalledWithSpecification('exists', withName(expectedFleet.name))
    aircraftRepository.assertCalledWith('find', expectedAircraftIds)
    fleetRepository.assertNotCalled('register')
    aircraftRepository.assertNotCalled('save')
  })
})
