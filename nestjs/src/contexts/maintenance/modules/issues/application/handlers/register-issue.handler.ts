import { Injectable } from '@nestjs/common'
import { RegisterIssueInput } from '../dtos/register-issue-input.dto'
import { RegisterIssueUseCase } from '../use-cases/register-issue-usecase.service'

@Injectable()
export class RegisterIssueHandler {
  constructor(
    private readonly useCase: RegisterIssueUseCase
  ) {}

  async handle(input: RegisterIssueInput): Promise<void> {
    await this.useCase.invoke(input)
  }
}
