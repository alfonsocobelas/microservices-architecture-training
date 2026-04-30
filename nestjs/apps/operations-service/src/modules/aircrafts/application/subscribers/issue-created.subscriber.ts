import { Injectable } from '@nestjs/common'
import { DomainEventClass } from '@libs/shared/domain/event-bus/domain-event'
import { DomainEventSubscriber } from '@libs/shared/domain/event-bus/domain-event-subscriber'
import { UpdateAircraftToMaintenanceStatusUseCase } from '../use-cases/update-aircraft-to-maintenance-status-usecase.service'
import { EventSubscriber } from '../../../shared/application/decorators/event-subscriber.decorator'
import { IssueRegisteredDomainEvent } from '../../../shared/domain/issues/issue-registered.event'
import { IssuePartCategoryEnum } from '../../../shared/domain/issues/issue-enums'

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
