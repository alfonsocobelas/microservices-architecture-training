import { Injectable } from '@nestjs/common'
import { RetireAircraftsFromFleetInput } from '../dtos/retire-aircrafts-from-fleet-input.dto'
import { RetireAircraftsFromFleetUsecase } from '../use-cases/retire-aircrafts-from-fleet-usecase.service'

@Injectable()
export class RetireAircraftsFromFleetHandler {
  constructor(
    private readonly useCase: RetireAircraftsFromFleetUsecase
  ) {}

  async handle(input: RetireAircraftsFromFleetInput): Promise<void> {
    await this.useCase.invoke(input)
  }
}
