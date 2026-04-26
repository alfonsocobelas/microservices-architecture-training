import { EntityTarget } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Nullable } from 'src/contexts/shared/types'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { TypeOrmRepository } from 'src/contexts/shared/infrastructure/persistence/typeorm/typeorm.repository'
import { TypeOrmCriteriaConverter } from 'src/contexts/shared/infrastructure/persistence/typeorm/typeorm-criteria-converter'
import { TypeOrmTransactionManager } from 'src/contexts/shared/infrastructure/persistence/typeorm/typeorm-transaction-manager'
import { Issue } from 'src/contexts/maintenance/modules/issues/domain/issue'
import { IssueRepository } from 'src/contexts/maintenance/modules/issues/domain/issue.repository'
import { IssueEntity } from './typeorm-issue.entity'
import { IssueMapper } from './typeorm-issue.mapper'
import { IssueId } from 'src/contexts/maintenance/modules/issues/domain/value-objects/issue-id.vo'

@Injectable()
export class TypeOrmIssueRepository
  extends TypeOrmRepository<IssueEntity>
  implements IssueRepository
{
  constructor(txManager: TypeOrmTransactionManager, converter: TypeOrmCriteriaConverter) {
    super(txManager, converter)
  }

  protected entitySchema(): EntityTarget<IssueEntity> {
    return IssueEntity
  }

  async register(issue: Issue): Promise<void> {
    const repository = this.repository()
    const entity = IssueMapper.toPersistence(issue)

    await repository.insert(entity)
  }

  async get(issueId: IssueId): Promise<Nullable<Issue>> {
    const repository = this.repository()
    const entity = await repository.findOneBy({ id: issueId.value })

    if (!entity) {
      return null
    }

    return IssueMapper.toDomain(entity)
  }

  async save(issues: Issue | Issue[]): Promise<void> {
    const entities = Array.isArray(issues)
      ? issues.map(IssueMapper.toPersistence)
      : IssueMapper.toPersistence(issues)

    await this.persist(entities)
  }

  async matching(criteria: Criteria): Promise<Issue[]> {
    const entities = await this.searchByCriteria(criteria)

    return entities.map(entity => IssueMapper.toDomain(entity))
  }

  async exists(criteria: Criteria): Promise<boolean> {
    return this.existsByCriteria(criteria)
  }
}
