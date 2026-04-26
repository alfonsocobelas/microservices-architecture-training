import { IssueRegisteredDomainEvent } from 'src/contexts/maintenance/modules/issues/domain/events/issue-registered.event'
import { ISSUE_CONSTRAINTS as LIMITS } from 'src/contexts/maintenance/modules/issues/domain/issue-constants'
import { IssuePartCategoryEnum, IssueSeverityLevelEnum } from 'src/contexts/maintenance/modules/issues/domain/issue-enums'
import { randomDate } from '../../../shared/utils/random-date'
import { UuidV7Mother } from '../../../shared/domain/mothers/uuidV7.mother'
import { randomUuidV7 } from '../../../shared/utils/ramdom-uuidv7'
import { randomString } from '../../../shared/utils/random-string'
import { randomBoolean } from '../../../shared/utils/random-boolean'
import { randomEnumValue } from '../../../shared/utils/random-enum'

export class IssueRegisteredDomainEventMother {
  static create(props: Partial<IssueRegisteredDomainEvent>): IssueRegisteredDomainEvent {
    return new IssueRegisteredDomainEvent({
      code: props.code || randomString(LIMITS.CODE.MIN_LENGTH, LIMITS.CODE.MAX_LENGTH),
      eventId: props.eventId || randomUuidV7(),
      severity: props.severity || randomEnumValue(IssueSeverityLevelEnum),
      engineId: props.engineId,
      occurredOn: props.occurredOn || randomDate(new Date(Date.now() - 1000 * 60 * 60), new Date()),
      aircraftId: props.aircraftId,
      aggregateId: props.aggregateId || randomUuidV7(),
      description: props.description || randomString(LIMITS.DESCRIPTION.MIN_LENGTH, LIMITS.DESCRIPTION.MAX_LENGTH),
      partCategory: props.partCategory || randomEnumValue(IssuePartCategoryEnum),
      requiresGrounding: props.requiresGrounding || randomBoolean()
    })
  }

  static avionicIssue(props: Partial<IssueRegisteredDomainEvent> = {}): IssueRegisteredDomainEvent {
    return this.create({
      partCategory: IssuePartCategoryEnum.AVIONICS,
      aircraftId: UuidV7Mother.random(),
      ...props
    })
  }

  static engineIssue(props: Partial<IssueRegisteredDomainEvent> = {}): IssueRegisteredDomainEvent {
    return this.create({
      partCategory: IssuePartCategoryEnum.ENGINE,
      engineId: UuidV7Mother.random(),
      ...props
    })
  }
}
