import { UpdateEngineToMaintenanceStatusUseCase } from 'src/contexts/operations/modules/engines/application/use-cases/update-engine-to-maintenance-status-usecase.service'
import { UpdateEngineToMaintenanceStatusInputMother } from '../mothers/update-engine-to-maintenance-status-input.mother'
import { EngineIdMother } from '../../domain/value-objects/engine-id.mother'
import { EngineMother } from '../../domain/engine.mother'
import { EngineRepositoryMock } from '../../mocks/engine.repository.mock'
import { EventBusMock } from '../../../shared/mocks/event-bus.mock'

describe('UpdateEngineToMaintenanceStatusUseCase (unit tests)', () => {
  let repository: EngineRepositoryMock
  let useCase: UpdateEngineToMaintenanceStatusUseCase
  let eventBus: EventBusMock

  beforeEach(() => {
    repository = new EngineRepositoryMock()
    eventBus = new EventBusMock()
    useCase = new UpdateEngineToMaintenanceStatusUseCase(repository, eventBus)
  })

  it('should update engine status to maintenance', async () => {
    const input = UpdateEngineToMaintenanceStatusInputMother.random()
    const expectedEngine = EngineMother.fromInput(input)
    const expectedEvents = expectedEngine.pullDomainEvents()

    // GIVEN
    repository.givenFound(expectedEngine)

    // WHEN
    await useCase.invoke(input)
    repository.whenUpdateStatusSuccess()

    // THEN
    repository.assertCalledWith('get', expectedEngine.id)
    repository.assertCalledWith('updateStatus', expectedEngine.id, expectedEngine.status)
    eventBus.assertPublishedEvents(expectedEvents)
  })

  it('should throw EntityNotFoundError if engine does not exist', async () => {
    // GIVEN
    const input = UpdateEngineToMaintenanceStatusInputMother.random()
    const expectedEngineId = EngineIdMother.create(input.id)
    repository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input))
      .rejects.toThrow(`Engine with id "${input.id}" not found.`)

    repository.assertCalledWith('get', expectedEngineId)
    repository.assertNotCalled('updateStatus')
    eventBus.assertNotPublished()
  })
})
