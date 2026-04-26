import { Injectable } from '@nestjs/common'
import { GetAircraftModelUseCase } from '../use-cases/get-aircraft-model-usecase.service'
import { GetAircraftModelResponse } from '../../infrastructure/entrypoints/dtos/get-aircraft-model.response'

@Injectable()
export class GetAircraftModelHandler {
  constructor(
    private readonly useCase: GetAircraftModelUseCase
  ) {}

  async handle(id: string): Promise<GetAircraftModelResponse> {
    const output = await this.useCase.invoke({ id })

    return new GetAircraftModelResponse(output)
  }
}
