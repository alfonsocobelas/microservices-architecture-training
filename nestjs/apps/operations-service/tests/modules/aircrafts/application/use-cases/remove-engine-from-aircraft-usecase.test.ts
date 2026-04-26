import { RemoveEngineFromAircraftUsecase } from 'src/contexts/operations/modules/aircrafts/application/use-cases/remove-engine-from-aircraft-usecase.service'
import { RemoveEngineFromAircraftInputMother } from '../mothers/remove-engine-from-aircraft-input.mother'
import { EngineMother } from '../../../engines/domain/engine.mother'
import { EngineBuilder } from '../../../engines/domain/engine.builder'
import { AircraftBuilder } from '../../domain/aircraft.builder'
import { EventBusMock } from '../../../shared/mocks/event-bus.mock'
import { EngineRepositoryMock } from '../../../engines/mocks/engine.repository.mock'
import { AircraftRepositoryMock } from '../../mocks/aircraft.repository.mock'
import { AircraftMother } from '../../domain/aircraft.mother'

describe('RemoveEngineFromAircraftUseCase (unit tests)', () => {
  let aircraftRepository: AircraftRepositoryMock
  let engineRepository: EngineRepositoryMock
  let eventBus: EventBusMock
  let useCase: RemoveEngineFromAircraftUsecase

  beforeEach(() => {
    aircraftRepository = new AircraftRepositoryMock()
    engineRepository = new EngineRepositoryMock()
    eventBus = new EventBusMock()
    useCase = new RemoveEngineFromAircraftUsecase(engineRepository, aircraftRepository, eventBus)
  })

  it('should remove an engine from an aircraft', async () => {
    // GIVEN
    const input = RemoveEngineFromAircraftInputMother.random()
    const expectedAircraft = AircraftBuilder
      .anAircraft()
      .withId(input.aircraftId)
      .withEngineIds([input.engineId])
      .build()
    const expectedEngine = EngineBuilder
      .anEngine()
      .withId(input.engineId)
      .withAircraftId(input.aircraftId)
      .withIsInstalled(true)
      .build()
    const expectedEvents = [...expectedAircraft.pullDomainEvents(), ...expectedEngine.pullDomainEvents()]
    aircraftRepository.givenFound(expectedAircraft)
    engineRepository.givenFound(expectedEngine)

    // WHEN
    await useCase.invoke(input)

    // THEN
    aircraftRepository.assertCalledWith('get', expectedAircraft.id)
    engineRepository.assertCalledWith('get', expectedEngine.id)
    aircraftRepository.assertCalledWith('save', expectedAircraft)
    engineRepository.assertCalledWith('save', expectedEngine)
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should throw EntityNotFoundError if engine does not exist', async () => {
    // GIVEN
    const input = RemoveEngineFromAircraftInputMother.random()
    const expectedEngine = EngineMother.installed(input.engineId, input.aircraftId)
    const expectedAircraft = AircraftBuilder.anAircraft().withId(input.aircraftId).build()
    aircraftRepository.givenFound(expectedAircraft)
    engineRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`Engine with id "${input.engineId}" not found.`)

    aircraftRepository.assertCalledWith('get', expectedAircraft.id)
    engineRepository.assertCalledWith('get', expectedEngine.id)
    aircraftRepository.assertNotCalled('save')
    engineRepository.assertNotCalled('save')
  })

  it('should throw EntityNotFoundError if aircraft does not exist ', async () => {
    // GIVEN
    const input = RemoveEngineFromAircraftInputMother.random()
    const expectedAircraft = AircraftMother.fromInput({ id: input.aircraftId })
    const expectedEngine = EngineMother.installed(input.engineId, input.aircraftId)
    engineRepository.givenFound(expectedEngine)
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`Aircraft with id "${input.aircraftId}" not found.`)

    aircraftRepository.assertCalledWith('get', expectedAircraft.id)
    engineRepository.assertCalledWith('get', expectedEngine.id)
    aircraftRepository.assertNotCalled('save')
    engineRepository.assertNotCalled('save')
  })
})
