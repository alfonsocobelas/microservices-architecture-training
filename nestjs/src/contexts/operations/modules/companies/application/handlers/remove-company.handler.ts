import { Injectable } from '@nestjs/common'
import { RemoveCompanyUseCase } from '../use-cases/remove-company-usecase.service'

@Injectable()
export class RemoveCompanyHandler {
  constructor(
    private readonly useCase: RemoveCompanyUseCase
  ) {}

  async handle(id: string): Promise<void> {
    await this.useCase.invoke({ id })
  }
}
