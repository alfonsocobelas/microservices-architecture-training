import { GetEngineUseCase } from 'src/contexts/operations/modules/engines/application/use-cases/get-engine-usecase.service'
import { EngineMother } from '../../domain/engine.mother'
import { GetEngineInputMother } from '../mothers/get-engine-input.mother'
import { GetEngineOutputMother } from '../mothers/get-engine-output.mother'
import { EngineRepositoryMock } from '../../mocks/engine.repository.mock'

describe('GetEngineUseCase (unit tests)', () => {
  let repository: EngineRepositoryMock
  let useCase: GetEngineUseCase

  beforeEach(() => {
    repository = new EngineRepositoryMock()
    useCase = new GetEngineUseCase(repository)
  })

  it('should get an existing engine by id', async () => {
    // GIVEN
    const input = GetEngineInputMother.random()
    const expectedEngine = EngineMother.fromInput(input)
    const expectedOutput = GetEngineOutputMother.fromDomain(expectedEngine)
    repository.givenFound(expectedEngine)

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    expect(result).toEqual(expectedOutput)
    repository.assertCalledWith('get', expectedEngine.id)
  })

  it('should throw EntityNotFoundError if engine does not exist', async () => {
    // GIVEN
    const input = GetEngineInputMother.random()
    const expectedEngine = EngineMother.fromInput(input)
    repository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`Engine with id "${input.id}" not found.`)

    repository.assertCalledWith('get', expectedEngine.id)
  })
})
