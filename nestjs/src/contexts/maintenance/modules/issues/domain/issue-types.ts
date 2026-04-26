
import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { IssueId } from './value-objects/issue-id.vo'
import { IssueCode } from './value-objects/issue-code.vo'
import { IssueDescription } from './value-objects/issue-description.vo'
import { IssuePartCategory } from './value-objects/issue-part-category.vo'
import { IssueSeverityLevel } from './value-objects/issue-severity.vo'
import { IssueRequiresGrounding } from './value-objects/issue-requires-grounding.vo'

export interface IssueAggregateProps {
  id: IssueId
  engineId?: EngineId
  aircraftId?: AircraftId
  code: IssueCode
  description: IssueDescription
  severity: IssueSeverityLevel
  requiresGrounding: IssueRequiresGrounding
  partCategory: IssuePartCategory
}

export interface IssuePrimitiveProps {
  id: string
  engineId?: string
  aircraftId?: string
  code: string
  description: string
  severity: string
  requiresGrounding: boolean
  partCategory: string
}
