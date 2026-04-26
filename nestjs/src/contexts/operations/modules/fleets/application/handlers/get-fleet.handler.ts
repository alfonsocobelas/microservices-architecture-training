import { Injectable } from '@nestjs/common'
import { GetFleetResponse } from '../../infrastructure/entrypoints/dtos/get-fleet.response'
import { GetFleetUseCase } from '../use-cases/get-fleet-usecase.service'

@Injectable()
export class GetFleetHandler {
  constructor(
    private readonly useCase: GetFleetUseCase
  ) {}

  async handle(id: string): Promise<GetFleetResponse> {
    const output = await this.useCase.invoke({ id })

    return new GetFleetResponse(output)
  }
}
