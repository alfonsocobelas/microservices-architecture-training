import { Injectable } from '@nestjs/common'
import { InstallEngineInAircraftUsecase } from '../use-cases/install-engine-in-aircraft-usecase.service'

@Injectable()
export class InstallEngineInAircraftHandler {
  constructor(
    private readonly useCase: InstallEngineInAircraftUsecase
  ) {}

  async handle(aircraftId: string, engineId: string): Promise<void> {
    await this.useCase.invoke({ aircraftId, engineId })
  }
}
