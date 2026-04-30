import { Injectable } from '@nestjs/common'
import { DomainEventClass } from '@libs/shared/domain/event-bus/domain-event'
import { DomainEventSubscriber } from '@libs/shared/domain/event-bus/domain-event-subscriber'

import { UpdateEngineToMaintenanceStatusUseCase } from '../use-cases/update-engine-to-maintenance-status-usecase.service'
import { EventSubscriber } from '../../../shared/application/decorators/event-subscriber.decorator'
import { IssueRegisteredDomainEvent } from '../../../shared/domain/issues/issue-registered.event'
import { IssuePartCategoryEnum } from '../../../shared/domain/issues/issue-enums'

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
