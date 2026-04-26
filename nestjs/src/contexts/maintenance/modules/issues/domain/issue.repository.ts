import { Nullable } from 'src/contexts/shared/types'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { IssueId } from './value-objects/issue-id.vo'
import { Issue } from './issue'

export abstract class IssueRepository {
  abstract register(issue: Issue): Promise<void>
  abstract save(issues: Issue | Issue[]): Promise<void>
  abstract get(issueId: IssueId): Promise<Nullable<Issue>>
  abstract matching(criteria: Criteria): Promise<Issue[]>
  abstract exists(criteria: Criteria): Promise<boolean>
}
