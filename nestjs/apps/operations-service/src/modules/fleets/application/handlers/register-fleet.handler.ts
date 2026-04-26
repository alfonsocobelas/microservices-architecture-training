import { Injectable } from '@nestjs/common'
import { RegisterFleetDto } from '../../infrastructure/entrypoints/dtos/register-fleet.dto'
import { RegisterFleetUseCase } from '../use-cases/register-fleet-usecase.service'

@Injectable()
export class RegisterFleetHandler {
  constructor(
    private readonly useCase: RegisterFleetUseCase
  ) {}

  async handle(dto: RegisterFleetDto): Promise<void> {
    await this.useCase.invoke(dto)
  }
}
