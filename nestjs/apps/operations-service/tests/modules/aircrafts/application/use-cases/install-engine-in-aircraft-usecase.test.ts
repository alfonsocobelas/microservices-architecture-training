import { AircraftStatusEnum } from 'src/contexts/operations/modules/aircrafts/domain/aircraft-enums'
import { InstallEngineInAircraftUsecase } from 'src/contexts/operations/modules/aircrafts/application/use-cases/install-engine-in-aircraft-usecase.service'
import { InstallEngineInAircraftInputMother } from '../mothers/install-engine-in-aircraft-input.mother'
import { EngineMother } from '../../../engines/domain/engine.mother'
import { AircraftMother } from '../../domain/aircraft.mother'
import { AircraftBuilder } from '../../domain/aircraft.builder'
import { AircraftModelBuilder } from '../../../aircraft-models/domain/aircraft-model.builder'
import { EventBusMock } from '../../../shared/mocks/event-bus.mock'
import { EngineRepositoryMock } from '../../../engines/mocks/engine.repository.mock'
import { AircraftRepositoryMock } from '../../mocks/aircraft.repository.mock'
import { TransactionManagerMock } from '../../../shared/mocks/transaction-manager.mock'
import { AircraftModelRepositoryMock } from '../../../aircraft-models/mocks/aircraft-model.repository.mock'

describe('InstallEngineInAircraftUseCase (unit tests)', () => {
  let aircraftRepository: AircraftRepositoryMock
  let engineRepository: EngineRepositoryMock
  let modelRepository: AircraftModelRepositoryMock
  let txManager: TransactionManagerMock
  let eventBus: EventBusMock
  let useCase: InstallEngineInAircraftUsecase

  beforeEach(() => {
    aircraftRepository = new AircraftRepositoryMock()
    engineRepository = new EngineRepositoryMock()
    modelRepository = new AircraftModelRepositoryMock()
    txManager = new TransactionManagerMock()
    eventBus = new EventBusMock()
    useCase = new InstallEngineInAircraftUsecase(
      engineRepository, aircraftRepository, modelRepository, txManager, eventBus
    )
    txManager.whenRunInTransactionSuccess()
  })

  it('should install an engine in an aircraft', async () => {
    // GIVEN
    const input = InstallEngineInAircraftInputMother.random()
    const expectedEngine = EngineMother.free(input.engineId, input.aircraftId)
    const expectedAircraft = AircraftBuilder
      .anAircraft()
      .withId(input.aircraftId)
      .withEngineIds([])
      .withStatus(AircraftStatusEnum.ACTIVE)
      .build()
    const expectedModel = AircraftModelBuilder
      .aModel()
      .withId(expectedAircraft.modelId.value)
      .withNumEngines(2)
      .build()
    const expectedEvents = [...expectedAircraft.pullDomainEvents(), ...expectedEngine.pullDomainEvents()]
    aircraftRepository.givenFound(expectedAircraft)
    engineRepository.givenFound(expectedEngine)
    modelRepository.givenFound(expectedModel)

    // WHEN
    await useCase.invoke(input)

    // THEN
    aircraftRepository.assertCalledWith('get', expectedAircraft.id)
    engineRepository.assertCalledWith('get', expectedEngine.id)
    modelRepository.assertCalledWith('get', expectedAircraft.modelId)
    aircraftRepository.assertCalledWith('save', expectedAircraft)
    engineRepository.assertCalledWith('save', expectedEngine)
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should throw EntityNotFoundError if engine does not exist', async () => {
    // GIVEN
    const input = InstallEngineInAircraftInputMother.random()
    const expectedAircraft = AircraftMother.activeInFlight(input.aircraftId)
    const expectedEngine = EngineMother.fromInput({ id: input.engineId })
    aircraftRepository.givenFound(expectedAircraft)
    engineRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Engine with id "${input.engineId}" not found.`)
    aircraftRepository.assertCalledWith('get', expectedAircraft.id)
    engineRepository.assertCalledWith('get', expectedEngine.id)
    modelRepository.assertNotCalled('get')
    aircraftRepository.assertNotCalled('save')
    engineRepository.assertNotCalled('save')
  })

  it('should throw EntityNotFoundError if aircraft does not exist', async () => {
    // GIVEN
    const input = InstallEngineInAircraftInputMother.random()
    const expectedAircraft = AircraftMother.fromInput({ id: input.aircraftId })
    const expectedEngine = EngineMother.free(input.engineId, input.aircraftId)
    engineRepository.givenFound(expectedEngine)
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`Aircraft with id "${input.aircraftId}" not found.`)

    aircraftRepository.assertCalledWith('get', expectedAircraft.id)
    engineRepository.assertCalledWith('get', expectedEngine.id)
    modelRepository.assertNotCalled('get')
    aircraftRepository.assertNotCalled('save')
    engineRepository.assertNotCalled('save')
  })

  it('should throw EntityNotFoundError if aircraft model does not exist', async () => {
    // GIVEN
    const input = InstallEngineInAircraftInputMother.random()
    const expectedEngine = EngineMother.free(input.engineId, input.aircraftId)
    const expectedAircraft = AircraftMother.activeInFlight(input.aircraftId)
    aircraftRepository.givenFound(expectedAircraft)
    engineRepository.givenFound(expectedEngine)
    modelRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`AircraftModel with id "${expectedAircraft.modelId}" not found.`)

    aircraftRepository.assertCalledWith('get', expectedAircraft.id)
    engineRepository.assertCalledWith('get', expectedEngine.id)
    modelRepository.assertCalledWith('get', expectedAircraft.modelId)
    aircraftRepository.assertNotCalled('save')
    engineRepository.assertNotCalled('save')
  })
})
