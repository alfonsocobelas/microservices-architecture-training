import { Injectable } from '@nestjs/common'
import { GetIssueUseCase } from 'src/contexts/maintenance/modules/issues/application/use-cases/get-issue-usecase.service'
import { GetIssueResponse } from '../../infrastructure/entrypoints/dtos/get-issue.response'

@Injectable()
export class GetIssueHandler {
  constructor(
    private readonly useCase: GetIssueUseCase
  ) {}

  async handle(id: string): Promise<GetIssueResponse> {
    const output = await this.useCase.invoke({ id })

    return new GetIssueResponse(output)
  }
}
