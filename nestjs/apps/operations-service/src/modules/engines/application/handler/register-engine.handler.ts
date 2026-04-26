import { Injectable } from '@nestjs/common'
import { RegisterEngineDto } from '../../infrastructure/entrypoints/dtos/register-engine.dto'
import { RegisterEngineUseCase } from '../use-cases/register-engine-usecase.service'

@Injectable()
export class RegisterEngineHandler {
  constructor(
    private readonly useCase: RegisterEngineUseCase
  ) {}

  async handle(dto: RegisterEngineDto): Promise<void> {
    await this.useCase.invoke(dto)
  }
}
