import { Injectable } from '@nestjs/common'
import { EventSubscriber } from 'src/contexts/shared/application/event-bus/event-subscriber.decorator'
import { DomainEventClass } from 'src/contexts/shared/domain/event-bus/domain-event'
import { IssuePartCategoryEnum } from 'src/contexts/maintenance/modules/issues/domain/issue-enums'
import { DomainEventSubscriber } from 'src/contexts/shared/domain/event-bus/domain-event-subscriber'
import { IssueRegisteredDomainEvent } from 'src/contexts/maintenance/modules/issues/domain/events/issue-registered.event'
import { UpdateAircraftToMaintenanceStatusUseCase } from '../use-cases/update-aircraft-to-maintenance-status-usecase.service'

@Injectable()
@EventSubscriber()
export class AircraftIssueCreatedSubscriber implements DomainEventSubscriber<IssueRegisteredDomainEvent> {
  constructor(
    private readonly useCase: UpdateAircraftToMaintenanceStatusUseCase
  ) {}

  subscribedTo(): DomainEventClass[] {
    return [IssueRegisteredDomainEvent]
  }

  async on(event: IssueRegisteredDomainEvent): Promise<void> {
    if (event.partCategory !== IssuePartCategoryEnum.AVIONICS) {
      return
    }

    if (!event.aircraftId) {
      return
    }

    await this.useCase.invoke({ id: event.aircraftId })
  }
}
