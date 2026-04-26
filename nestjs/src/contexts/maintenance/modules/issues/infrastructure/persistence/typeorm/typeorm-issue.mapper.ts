import { Issue } from 'src/contexts/maintenance/modules/issues/domain/issue'
import { IssueEntity } from './typeorm-issue.entity'

export class IssueMapper {
  static toDomain(entity: IssueEntity): Issue {
    return Issue.fromPrimitives({
      id: entity.id,
      code: entity.code,
      severity: entity.severity,
      engineId: entity.engineId ?? undefined,
      aircraftId: entity.aircraftId ?? undefined,
      description: entity.description,
      partCategory: entity.partCategory,
      requiresGrounding: entity.requiresGrounding
    })
  }

  static toPersistence(domain: Issue): IssueEntity {
    const entity = new IssueEntity()

    entity.id = domain.id.value
    entity.code = domain.code.value
    entity.severity = domain.severity.value
    entity.engineId = domain.engineId?.value ?? null
    entity.aircraftId = domain.aircraftId?.value ?? null
    entity.description = domain.description.value
    entity.partCategory = domain.partCategory.value
    entity.requiresGrounding = domain.requiresGrounding.value

    return entity
  }
}
