import { Injectable } from '@nestjs/common'
import { RegisterAircraftModelUseCase } from '../use-cases/register-aircraft-model-usecase.service'
import { RegisterAircraftModelDto } from '../../infrastructure/entrypoints/dtos/register-aircraft-model.dto'

@Injectable()
export class RegisterAircraftModelHandler {
  constructor(
    private readonly useCase: RegisterAircraftModelUseCase
  ) {}

  async handle(dto: RegisterAircraftModelDto): Promise<void> {
    await this.useCase.invoke(dto)
  }
}
