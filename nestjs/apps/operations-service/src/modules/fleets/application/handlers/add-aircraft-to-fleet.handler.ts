import { Injectable } from '@nestjs/common'
import { AddAircraftToFleetDto } from '../../infrastructure/entrypoints/dtos/add-aircraft-to-fleet.dto'
import { AddAircraftToFleetUsecase } from '../use-cases/add-aircraft-to-fleet-usecase.service'

@Injectable()
export class AddAircraftToFleetHandler {
  constructor(
    private readonly useCase: AddAircraftToFleetUsecase
  ) {}

  async handle(dto: AddAircraftToFleetDto): Promise<void> {
    await this.useCase.invoke(dto)
  }
}
