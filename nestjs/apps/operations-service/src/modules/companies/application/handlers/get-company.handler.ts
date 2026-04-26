import { Injectable } from '@nestjs/common'
import { GetCompanyResponse } from '../../infrastructure/entrypoints/dtos/get-company.response'
import { GetCompanyUseCase } from '../use-cases/get-company-usecase.service'

@Injectable()
export class GetCompanyHandler {
  constructor(
    private readonly useCase: GetCompanyUseCase
  ) {}

  async handle(id: string): Promise<GetCompanyResponse> {
    const output = await this.useCase.invoke({ id })

    return new GetCompanyResponse(output)
  }
}
