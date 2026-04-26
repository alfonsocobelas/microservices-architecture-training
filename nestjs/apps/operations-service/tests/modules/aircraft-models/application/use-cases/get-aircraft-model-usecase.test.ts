import { GetAircraftModelUseCase } from 'src/contexts/operations/modules/aircraft-models/application/use-cases/get-aircraft-model-usecase.service'
import { AircraftModelMother } from '../../domain/aircraft-model.mother'
import { GetAircraftModelInputMother } from '../dtos/get-aircraft-model-input.mother'
import { GetAircraftModelOutputMother } from '../dtos/get-aircraft-model-output.mother'
import { AircraftModelRepositoryMock } from '../../mocks/aircraft-model.repository.mock'

describe('GetAircraftModelUseCase (unit tests)', () => {
  let repository: AircraftModelRepositoryMock
  let useCase: GetAircraftModelUseCase

  beforeEach(() => {
    repository = new AircraftModelRepositoryMock()
    useCase = new GetAircraftModelUseCase(repository)
  })

  it('should get an existing aircraft model by id', async () => {
    // ARRANGE
    const input = GetAircraftModelInputMother.random()
    const expectedModel = AircraftModelMother.fromInput(input)
    const expectedOutput = GetAircraftModelOutputMother.fromDomain(expectedModel)

    // GIVEN
    repository.givenFound(expectedModel)

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    expect(result).toEqual(expectedOutput)
    repository.assertCalledWith('get', expectedModel.id)
  })

  it('should throw EntityNotFoundError if model does not exist', async () => {
    // ARRANGE
    const input = GetAircraftModelInputMother.random()
    const expectedModel = AircraftModelMother.fromInput(input)

    // GIVEN
    repository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`AircraftModel with id "${expectedModel.id.value}" not found.`)

    repository.assertCalledWith('get', expectedModel.id)
  })
})
