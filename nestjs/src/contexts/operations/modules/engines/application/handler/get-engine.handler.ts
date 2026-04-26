import { Injectable } from '@nestjs/common'
import { GetEngineResponse } from '../../infrastructure/entrypoints/dtos/get-engine.response'
import { GetEngineUseCase } from '../use-cases/get-engine-usecase.service'

@Injectable()
export class GetEngineHandler {
  constructor(
    private readonly useCase: GetEngineUseCase
  ) {}

  async handle(id: string): Promise<GetEngineResponse> {
    const output = await this.useCase.invoke({ id })

    return new GetEngineResponse(output)
  }
}
