import { v7 as uuidv7 } from 'uuid'
import { Issue } from 'src/contexts/maintenance/modules/issues/domain/issue'
import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { IssueId } from 'src/contexts/maintenance/modules/issues/domain/value-objects/issue-id.vo'
import { IssueCode } from 'src/contexts/maintenance/modules/issues/domain/value-objects/issue-code.vo'
import { IssueDescription } from 'src/contexts/maintenance/modules/issues/domain/value-objects/issue-description.vo'
import { IssuePartCategory } from 'src/contexts/maintenance/modules/issues/domain/value-objects/issue-part-category.vo'
import { IssueSeverityLevel } from 'src/contexts/maintenance/modules/issues/domain/value-objects/issue-severity.vo'
import { IssueRequiresGrounding } from 'src/contexts/maintenance/modules/issues/domain/value-objects/issue-requires-grounding.vo'
import { IssuePrimitiveProps } from 'src/contexts/maintenance/modules/issues/domain/issue-types'
import { ISSUE_CONSTRAINTS as LIMITS } from 'src/contexts/maintenance/modules/issues/domain/issue-constants'
import { IssuePartCategoryEnum, IssueSeverityLevelEnum } from 'src/contexts/maintenance/modules/issues/domain/issue-enums'
import { randomString } from '../../shared/utils/random-string'
import { randomBoolean } from '../../shared/utils/random-boolean'
import { randomEnumValue } from '../../shared/utils/random-enum'

/**
 * IMPORTANT: In integration tests, be careful with fields that have uniqueness constraints.
 * You must set them manually to avoid collisions with other objects created in the database
 * during test execution.
 */
export class IssueBuilder {
  private props: IssuePrimitiveProps = {
    id: uuidv7(),
    code: randomString(LIMITS.CODE.MIN_LENGTH, LIMITS.CODE.MAX_LENGTH).trim().toUpperCase(),
    description: randomString(LIMITS.DESCRIPTION.MIN_LENGTH, LIMITS.DESCRIPTION.MAX_LENGTH),
    severity: randomEnumValue(IssueSeverityLevelEnum),
    partCategory: randomEnumValue(IssuePartCategoryEnum),
    requiresGrounding: randomBoolean()
  }

  static anIssue(): IssueBuilder {
    return new IssueBuilder()
  }

  withId(id: string): IssueBuilder {
    this.props.id = id
    return this
  }

  withCode(code: string): IssueBuilder {
    this.props.code = code
    return this
  }

  withDescription(description: string): IssueBuilder {
    this.props.description = description
    return this
  }

  withSeverity(severity: IssueSeverityLevelEnum): IssueBuilder {
    this.props.severity = severity
    return this
  }

  withRequiresGrounding(requiresGrounding: boolean): IssueBuilder {
    this.props.requiresGrounding = requiresGrounding
    return this
  }

  withPartCategory(partCategory: IssuePartCategoryEnum): IssueBuilder {
    this.props.partCategory = partCategory
    return this
  }

  withAircraftId(aircraftId: string): IssueBuilder {
    this.props.aircraftId = aircraftId
    return this
  }

  withEngineId(engineId: string): IssueBuilder {
    this.props.engineId = engineId
    return this
  }

  withProps(overrides?: Partial<IssuePrimitiveProps>): IssueBuilder {
    this.props = { ...this.props, ...overrides }
    return this
  }

  create(): Issue {
    return Issue.create({
      id: IssueId.create(this.props.id),
      code: IssueCode.create(this.props.code),
      description: IssueDescription.create(this.props.description),
      severity: IssueSeverityLevel.create(this.props.severity),
      requiresGrounding: IssueRequiresGrounding.create(this.props.requiresGrounding),
      partCategory: IssuePartCategory.create(this.props.partCategory, this.props.aircraftId, this.props.engineId),
      aircraftId: this.props.aircraftId ? AircraftId.create(this.props.aircraftId) : undefined,
      engineId: this.props.engineId ? EngineId.create(this.props.engineId) : undefined
    })
  }

  build(): Issue {
    return Issue.fromPrimitives(this.props)
  }
}
