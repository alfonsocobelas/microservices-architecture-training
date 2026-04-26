import { Injectable } from '@nestjs/common'
import { RegisterAircraftUseCase } from '../use-cases/register-aircraft-usecase.service'
import { RegisterAircraftDto } from '../../infrastructure/entrypoints/dtos/register-aircraft.dto'

@Injectable()
export class RegisterAircraftHandler {
  constructor(
    private readonly useCase: RegisterAircraftUseCase
  ) {}

  async handle(dto: RegisterAircraftDto): Promise<void> {
    await this.useCase.invoke(dto)
  }
}
