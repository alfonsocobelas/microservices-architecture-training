import { IssueRegisteredDomainEventMother } from '../../../../../../maintenance-service/tests/modules/issues/domain/events/issue-registerd-event.mother'
import { EngineIssueCreatedSubscriber } from '../../../../../src/modules/engines/application/subscribers/engine-issue-created.subscriber'
import { UpdateEngineToMaintenanceStatusUseCase } from '../../../../../src/modules/engines/application/use-cases/update-engine-to-maintenance-status-usecase.service'

describe('EngineIssueCreatedSubscriber (unit tests)', () => {
  let subscriber: EngineIssueCreatedSubscriber
  let useCase: UpdateEngineToMaintenanceStatusUseCase

  beforeEach(() => {
    useCase = { invoke: jest.fn() } as unknown as UpdateEngineToMaintenanceStatusUseCase
    subscriber = new EngineIssueCreatedSubscriber(useCase)
  })

  it('should handle IssueRegisteredDomainEvent for engine issues', async () => {
    // GIVEN
    const event = IssueRegisteredDomainEventMother.engineIssue()

    // WHEN
    await subscriber.on(event)

    // THEN
    expect(useCase.invoke).toHaveBeenCalledWith({ id: event.engineId })
  })

  it('should ignore events that are not related to engine issues', async () => {
    // GIVEN
    const event = IssueRegisteredDomainEventMother.avionicIssue()

    // WHEN
    await subscriber.on(event)

    // THEN
    expect(useCase.invoke).not.toHaveBeenCalled()
  })

  it('should ignore engine issues without engineId', async () => {
    // GIVEN
    const event = IssueRegisteredDomainEventMother.engineIssue({ engineId: undefined })

    // WHEN
    await subscriber.on(event)

    // THEN
    expect(useCase.invoke).not.toHaveBeenCalled()
  })
})
