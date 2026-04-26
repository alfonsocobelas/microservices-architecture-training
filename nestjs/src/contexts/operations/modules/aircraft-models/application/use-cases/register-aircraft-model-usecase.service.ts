import { Injectable } from '@nestjs/common'
import { EventBus } from 'src/contexts/shared/domain/event-bus/event-bus'
import { AlreadyExistsError } from 'src/contexts/shared/errors'
import { RegisterAircraftModelInput } from '../dtos/register-aircraft-model-input.dto'
import { AircraftModel } from '../../domain/aircraft-model'
import { AircraftModelInputMapper } from '../../domain/aircraft-model-factory'
import { AircraftModelRepository } from '../../domain/aircraft-model.repository'

@Injectable()
export class RegisterAircraftModelUseCase {
  constructor(
    private readonly repository: AircraftModelRepository,
    private readonly eventBus: EventBus
  ) {}

  async invoke(input: RegisterAircraftModelInput): Promise<void> {
    const props = AircraftModelInputMapper.toDomain(input)

    const modelExists = await this.repository.exists(props.code)
    if (modelExists) {
      throw new AlreadyExistsError('AircraftModel', 'code', props.code.value)
    }

    const aircraftModel = AircraftModel.create(props)

    await this.repository.register(aircraftModel)
    await this.eventBus.publish(aircraftModel.pullDomainEvents())
  }
}
