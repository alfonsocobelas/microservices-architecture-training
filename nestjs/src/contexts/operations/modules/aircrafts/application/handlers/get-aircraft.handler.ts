import { Injectable } from '@nestjs/common'
import { GetAircraftUseCase } from '../use-cases/get-aircraft-usecase.service'
import { GetAircraftResponse } from '../../infrastructure/entrypoints/dtos/get-aircraft.response'

@Injectable()
export class GetAircraftHandler {
  constructor(
    private readonly useCase: GetAircraftUseCase
  ) {}

  async handle(id: string): Promise<GetAircraftResponse> {
    const output = await this.useCase.invoke({ id })

    return new GetAircraftResponse(output)
  }
}
