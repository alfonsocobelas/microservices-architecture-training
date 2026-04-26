import { RegisterIssueInput } from '../application/dtos/register-issue-input.dto'
import { IssueAggregateProps } from './issue-types'
import { IssueCode } from './value-objects/issue-code.vo'
import { IssueDescription } from './value-objects/issue-description.vo'
import { IssueId } from './value-objects/issue-id.vo'
import { IssuePartCategory } from './value-objects/issue-part-category.vo'
import { IssueRequiresGrounding } from './value-objects/issue-requires-grounding.vo'
import { IssueSeverityLevel } from './value-objects/issue-severity.vo'

export class IssueInputMapper {
  static toDomain(raw: RegisterIssueInput): IssueAggregateProps {
    return {
      id: IssueId.create(raw.id),
      code: IssueCode.create(raw.code),
      description: IssueDescription.create(raw.description),
      severity: IssueSeverityLevel.create(raw.severity),
      requiresGrounding: IssueRequiresGrounding.create(raw.requiresGrounding),
      partCategory: IssuePartCategory.create(raw.partCategory, raw.aircraftId, raw.engineId)
    }
  }
}
