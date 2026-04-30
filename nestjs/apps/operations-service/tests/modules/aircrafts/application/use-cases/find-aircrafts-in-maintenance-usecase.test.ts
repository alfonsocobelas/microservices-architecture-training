import { FindAircraftsInMaintenanceOutputMother } from '../mothers/find-aircrafts-in-maintenance-output.mother'
import { AircraftMother } from '../../domain/aircraft.mother'
import { AircraftRepositoryMock } from '../../mocks/aircraft.repository.mock'
import { FindAircraftsInMaintenanceUseCase } from '../../../../../src/modules/aircrafts/application/use-cases/find-aircrafts-in-maintenance-usecase.service'
import { inMaintenance } from '../../../../../src/modules/aircrafts/domain/specifications/aircrafts-in-maintenance.specification'
import { Aircraft } from '../../../../../src/modules/aircrafts/domain/aircraft'
import { FindAircraftsInMaintenanceOutput } from '../../../../../src/modules/aircrafts/application/dtos/find-aircrafts-in-maintenance-output.dto'

describe('FindAircraftsInMaintenanceUseCase', () => {
  let repository: AircraftRepositoryMock
  let useCase: FindAircraftsInMaintenanceUseCase

  beforeEach(() => {
    repository = new AircraftRepositoryMock()
    useCase = new FindAircraftsInMaintenanceUseCase(repository)
  })

  it('should return a list of aircrafts in maintenance', async () => {
    // GIVEN
    const aircraftsInMaintenance = [AircraftMother.inMaintenance(), AircraftMother.inMaintenance()]
    const expectedOutput = FindAircraftsInMaintenanceOutputMother.fromDomainList(aircraftsInMaintenance)
    repository.givenMatching(aircraftsInMaintenance)

    // WHEN
    const result = await useCase.invoke()

    // THEN
    expect(result).toEqual(expectedOutput)
    repository.assertCalledWithSpecification('matching', inMaintenance())
  })

  it('should return an empty list if no aircrafts are in maintenance', async () => {
    // GIVEN
    const emptyAircraftsInMaintenance: Aircraft[] = []
    const expectedOutput: FindAircraftsInMaintenanceOutput[] = []
    repository.givenMatching(emptyAircraftsInMaintenance)

    // WHEN
    const result = await useCase.invoke()

    // THEN
    expect(result).toEqual(expectedOutput)
    repository.assertCalledWithSpecification('matching', inMaintenance())
  })
})
