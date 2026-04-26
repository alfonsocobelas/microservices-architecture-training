import { Injectable } from '@nestjs/common'
import { EventSubscriber } from 'src/contexts/shared/application/event-bus/event-subscriber.decorator'
import { DomainEventClass } from 'src/contexts/shared/domain/event-bus/domain-event'
import { DomainEventSubscriber } from 'src/contexts/shared/domain/event-bus/domain-event-subscriber'
import { IssuePartCategoryEnum } from 'src/contexts/maintenance/modules/issues/domain/issue-enums'
import { IssueRegisteredDomainEvent } from 'src/contexts/maintenance/modules/issues/domain/events/issue-registered.event'
import { UpdateEngineToMaintenanceStatusUseCase } from '../use-cases/update-engine-to-maintenance-status-usecase.service'

@Injectable()
@EventSubscriber()
export class EngineIssueCreatedSubscriber implements DomainEventSubscriber<IssueRegisteredDomainEvent> {
  constructor(
    private readonly useCase: UpdateEngineToMaintenanceStatusUseCase
  ) {}

  subscribedTo(): DomainEventClass[] {
    return [IssueRegisteredDomainEvent]
  }

  async on(event: IssueRegisteredDomainEvent): Promise<void> {
    if (event.partCategory !== IssuePartCategoryEnum.ENGINE) {
      return
    }

    if (!event.engineId) {
      return
    }

    await this.useCase.invoke({ id: event.engineId })
  }
}
