import { Issue } from 'src/contexts/maintenance/modules/issues/domain/issue'
import { IssueId } from 'src/contexts/maintenance/modules/issues/domain/value-objects/issue-id.vo'
import { Nullable } from 'src/contexts/shared/types'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { IssueRepository } from 'src/contexts/maintenance/modules/issues/domain/issue.repository'
import { MockRepository } from '../../shared/mocks/mock-repository'

export class IssueRepositoryMock
  extends MockRepository<Issue>
  implements IssueRepository
{
  register(issue: Issue): Promise<void> {
    return this.getMock('register')(issue)
  }

  save(issues: Issue | Issue[]): Promise<void> {
    return this.getMock('save')(issues)
  }

  get(issueId: IssueId): Promise<Nullable<Issue>> {
    return this.getMock('get')(issueId)
  }

  matching(criteria: Criteria): Promise<Issue[]> {
    return this.getMock('matching')(criteria)
  }

  exists(criteria: Criteria): Promise<boolean> {
    return this.getMock('exists')(criteria)
  }

  // Helpers
  givenFound(issue: Issue): void {
    this.setMockResult('get', issue)
  }

  givenNotFound(): void {
    this.setMockResult('get', null)
  }

  givenAlreadyExists(): void {
    this.setMockResult('exists', true)
  }

  givenDoesNotExist(): void {
    this.setMockResult('exists', false)
  }

  givenMatching(issues: Issue[]): void {
    this.setMockResult('matching', issues)
  }

  whenRegisterSuccess(): void {
    this.setMockResult('register', undefined)
  }

  whenSaveSuccess(): void {
    this.setMockResult('save', undefined)
  }
}
