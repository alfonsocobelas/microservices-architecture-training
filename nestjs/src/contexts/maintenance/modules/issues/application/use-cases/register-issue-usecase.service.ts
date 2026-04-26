import { Injectable } from '@nestjs/common'
import { EventBus } from 'src/contexts/shared/domain/event-bus/event-bus'
import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { AlreadyExistsError } from 'src/contexts/shared/errors'
import { RegisterIssueInput } from '../dtos/register-issue-input.dto'
import { Issue } from '../../domain/issue'
import { IssueId } from '../../domain/value-objects/issue-id.vo'
import { withCode } from '../../domain/specifications/issue-with-code.specification'
import { IssueCode } from '../../domain/value-objects/issue-code.vo'
import { IssueRepository } from '../../domain/issue.repository'
import { IssueInputMapper } from '../../domain/issue-factory'
import { IssueDescription } from '../../domain/value-objects/issue-description.vo'
import { IssuePartCategory } from '../../domain/value-objects/issue-part-category.vo'
import { IssueSeverityLevel } from '../../domain/value-objects/issue-severity.vo'
import { IssueRequiresGrounding } from '../../domain/value-objects/issue-requires-grounding.vo'

@Injectable()
export class RegisterIssueUseCase {
  constructor(
    private readonly repository: IssueRepository,
    private readonly eventBus: EventBus
  ) {}

  async invoke(input: RegisterIssueInput): Promise<void> {
    const props = IssueInputMapper.toDomain(input)

    const issueExists = await this.repository.exists(withCode(props.code))
    if (issueExists) {
      throw new AlreadyExistsError('Issue', 'code', input.code)
    }

    // todo: que hacemos con los campos opcionales? la creacion es dinamica... o viene uno u otro no los dos
    const issue = Issue.create({
      id: IssueId.create(input.id),
      code: IssueCode.create(input.code),
      severity: IssueSeverityLevel.create(input.severity),
      description: IssueDescription.create(input.description),
      partCategory: IssuePartCategory.create(input.partCategory, input.aircraftId, input.engineId),
      requiresGrounding: IssueRequiresGrounding.create(input.requiresGrounding),
      aircraftId: input.aircraftId ? AircraftId.create(input.aircraftId) : undefined,
      engineId: input.engineId ? EngineId.create(input.engineId) : undefined
    })

    await this.repository.register(issue)
    await this.eventBus.publish(issue.pullDomainEvents())
  }
}
