import { IssueRegisteredDomainEventMother } from '../../../../../../maintenance-service/tests/modules/issues/domain/events/issue-registerd-event.mother'
import { AircraftIssueCreatedSubscriber } from '../../../../../src/modules/aircrafts/application/subscribers/issue-created.subscriber'
import { UpdateAircraftToMaintenanceStatusUseCase } from '../../../../../src/modules/aircrafts/application/use-cases/update-aircraft-to-maintenance-status-usecase.service'

describe('AircraftIssueCreatedSubscriber (unit tests)', () => {
  let subscriber: AircraftIssueCreatedSubscriber
  let useCase: UpdateAircraftToMaintenanceStatusUseCase

  beforeEach(() => {
    useCase = { invoke: jest.fn() } as unknown as UpdateAircraftToMaintenanceStatusUseCase
    subscriber = new AircraftIssueCreatedSubscriber(useCase)
  })

  it('should handle IssueRegisteredDomainEvent for aircraft issues', async () => {
    // GIVEN
    const event = IssueRegisteredDomainEventMother.avionicIssue()

    // WHEN
    await subscriber.on(event)

    // THEN
    expect(useCase.invoke).toHaveBeenCalledWith({ id: event.aircraftId })
  })

  it('should ignore events that are not related to aircraft issues', async () => {
    // GIVEN
    const event = IssueRegisteredDomainEventMother.engineIssue()

    // WHEN
    await subscriber.on(event)

    // THEN
    expect(useCase.invoke).not.toHaveBeenCalled()
  })

  it('should ignore aircraft issues without aircraftId', async () => {
    // GIVEN
    const event = IssueRegisteredDomainEventMother.avionicIssue({ aircraftId: undefined })

    // WHEN
    await subscriber.on(event)

    // THEN
    expect(useCase.invoke).not.toHaveBeenCalled()
  })
})
