import { IssueId } from 'src/contexts/maintenance/modules/issues/domain/value-objects/issue-id.vo'
import { UuidV7Mother } from '../../../shared/domain/mothers/uuidV7.mother'

export class IssueIdMother {
  static create(value: string): IssueId {
    return IssueId.create(value)
  }

  static random(): IssueId {
    return this.create(UuidV7Mother.random())
  }
}
