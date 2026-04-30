/* eslint-disable @typescript-eslint/no-explicit-any */
import { IssueEntity } from '../../../../../src/modules/issues/infrastructure/persistence/typeorm/typeorm-issue.entity'

type EntityConstructor = { new (): any }

export const EntityMapper: Record<string, EntityConstructor> = {
  issues: IssueEntity
}
