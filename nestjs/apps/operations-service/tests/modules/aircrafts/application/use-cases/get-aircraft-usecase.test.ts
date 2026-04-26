import { GetAircraftUseCase } from 'src/contexts/operations/modules/aircrafts/application/use-cases/get-aircraft-usecase.service'
import { AircraftMother } from '../../domain/aircraft.mother'
import { AircraftModelMother } from '../../../aircraft-models/domain/aircraft-model.mother'
import { GetAircraftInputMother } from '../mothers/get-aircraft-input.mother'
import { GetAircraftOutputMother } from '../mothers/get-aircraft-output.mother'
import { AircraftModelRepositoryMock } from '../../../aircraft-models/mocks/aircraft-model.repository.mock'
import { AircraftRepositoryMock } from '../../mocks/aircraft.repository.mock'
import { EngineRepositoryMock } from '../../../engines/mocks/engine.repository.mock'
import { AircraftBuilder } from '../../domain/aircraft.builder'
import { EngineMother } from '../../../engines/domain/engine.mother'

describe('GetAircraftUseCase (unit tests)', () => {
  let aircraftRepository: AircraftRepositoryMock
  let modelRepository: AircraftModelRepositoryMock
  let engineRepository: EngineRepositoryMock
  let useCase: GetAircraftUseCase

  beforeEach(() => {
    aircraftRepository = new AircraftRepositoryMock()
    modelRepository = new AircraftModelRepositoryMock()
    engineRepository = new EngineRepositoryMock()
    useCase = new GetAircraftUseCase(aircraftRepository, modelRepository, engineRepository)
  })

  it('should get an existing aircraft by id', async () => {
    // ARRANGE
    const input = GetAircraftInputMother.random()
    const engines = [EngineMother.random(), EngineMother.random()]
    const engineIds = engines.map(engine => engine.id.value)
    const aircraft = AircraftBuilder.anAircraft().withId(input.id).withEngineIds(engineIds).build()
    const aircraftModel = AircraftModelMother.random()
    const expectedOutput = GetAircraftOutputMother.fromDomain(aircraft, aircraftModel, engines)

    // GIVEN
    aircraftRepository.givenFound(aircraft)
    modelRepository.givenFound(aircraftModel)
    engineRepository.givenFoundMany(engines)

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    expect(result).toEqual(expectedOutput)

    aircraftRepository.assertCalledWith('get', aircraft.id)
    modelRepository.assertCalledWith('get', aircraft.modelId)
    engineRepository.assertCalledWith('find', aircraft.engineIds.toArray)
  })

  it('should throw EntityNotFoundError if aircraft does not exist', async () => {
    // ARRANGE
    const input = GetAircraftInputMother.random()
    const aircraft = AircraftMother.fromInput(input)

    // GIVEN
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Aircraft with id "${input.id}" not found.`)

    aircraftRepository.assertCalledWith('get', aircraft.id)
    modelRepository.assertNotCalled('get')
    engineRepository.assertNotCalled('find')
  })
})
