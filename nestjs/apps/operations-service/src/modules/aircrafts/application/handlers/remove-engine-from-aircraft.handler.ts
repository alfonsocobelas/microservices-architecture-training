import { Injectable } from '@nestjs/common'
import { RemoveEngineFromAircraftUsecase } from '../use-cases/remove-engine-from-aircraft-usecase.service'

@Injectable()
export class RemoveEngineFromAircraftHandler {
  constructor(
    private readonly useCase: RemoveEngineFromAircraftUsecase
  ) {}

  async handle(aircraftId: string, engineId: string): Promise<void> {
    await this.useCase.invoke({ aircraftId, engineId })
  }
}
