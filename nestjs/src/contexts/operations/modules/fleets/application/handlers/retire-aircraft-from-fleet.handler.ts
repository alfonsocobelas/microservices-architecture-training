import { Injectable } from '@nestjs/common'
import { RetireAircraftFromFleetInput } from '../dtos/retire-aircraft-from-fleet-input'
import { RetireAircraftFromFleetUsecase } from '../use-cases/retire-aircraft-from-fleet-usecase.service'

@Injectable()
export class RetireAircraftFromFleetHandler {
  constructor(
    private readonly useCase: RetireAircraftFromFleetUsecase
  ) {}

  async handle(input: RetireAircraftFromFleetInput): Promise<void> {
    await this.useCase.invoke(input)
  }
}
