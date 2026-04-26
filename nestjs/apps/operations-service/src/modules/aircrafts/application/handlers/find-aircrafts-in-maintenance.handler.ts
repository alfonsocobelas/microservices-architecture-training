import { Injectable } from '@nestjs/common'
import { FindAircraftsInMaintenanceResponse } from '../../infrastructure/entrypoints/dtos/find-aircrafts-in-maintenance.response'
import { FindAircraftsInMaintenanceUseCase } from '../use-cases/find-aircrafts-in-maintenance-usecase.service'

@Injectable()
export class FindAircraftsInMaintenanceHandler {
  constructor(
    private readonly useCase: FindAircraftsInMaintenanceUseCase
  ) {}

  async handle(): Promise<FindAircraftsInMaintenanceResponse[]> {
    const output = await this.useCase.invoke()

    return output.map(item => new FindAircraftsInMaintenanceResponse(item))
  }
}
