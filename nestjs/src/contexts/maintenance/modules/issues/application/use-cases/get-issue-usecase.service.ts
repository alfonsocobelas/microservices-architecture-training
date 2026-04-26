import { Injectable } from '@nestjs/common'
import { EntityNotFoundError } from 'src/contexts/shared/errors'
import { GetIssueInput } from '../dtos/get-issue-input.dto'
import { GetIssueOutput } from '../dtos/get-issue-output.dto'
import { IssueRepository } from '../../domain/issue.repository'
import { IssueId } from '../../domain/value-objects/issue-id.vo'

@Injectable()
export class GetIssueUseCase {
  constructor(
    private readonly issueRepository: IssueRepository
  ) {}

  async invoke(input: GetIssueInput): Promise<GetIssueOutput> {
    const issueId = IssueId.create(input.id)

    const issue = await this.issueRepository.get(issueId)
    if (!issue) {
      throw new EntityNotFoundError('Issue', input.id)
    }

    return issue.toPrimitives()
  }
}
