import { Injectable } from '@nestjs/common'
import { RemoveAircraftUseCase } from '../use-cases/remove-aircraft-usecase.service'

@Injectable()
export class RemoveAircraftHandler {
  constructor(
    private readonly useCase: RemoveAircraftUseCase
  ) {}

  async handle(id: string): Promise<void> {
    await this.useCase.invoke({ id })
  }
}
