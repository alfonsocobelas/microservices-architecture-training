import { UuidV7Mother } from '@libs/testing'
import { IssueId } from '../../../../../src/modules/issues/domain/value-objects/issue-id.vo'

export class IssueIdMother {
  static create(value: string): IssueId {
    return IssueId.create(value)
  }

  static random(): IssueId {
    return this.create(UuidV7Mother.random())
  }
}
