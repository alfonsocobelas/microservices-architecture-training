import { Injectable } from '@nestjs/common'
import { EventBus } from 'src/contexts/shared/domain/event-bus/event-bus'
import { aircraftsOfModel } from 'src/contexts/operations/modules/aircrafts/domain/specifications/aircrafts-of-model.specification'
import { AircraftRepository } from 'src/contexts/operations/modules/aircrafts/domain/aircraft.repository'
import { EntityNotFoundError } from 'src/contexts/shared/errors'
import { RemoveAircraftModelInput } from '../dtos/remove-aircraft-model-input.dto'
import { AircraftModelRepository } from '../../domain/aircraft-model.repository'
import { AircraftModelInputMapper } from '../../domain/aircraft-model-factory'

@Injectable()
export class RemoveAircraftModelUseCase {
  constructor(
    private readonly modelRepository: AircraftModelRepository,
    private readonly aircraftRepository: AircraftRepository,
    private readonly eventBus: EventBus
  ) {}

  async invoke(input: RemoveAircraftModelInput): Promise<void> {
    const { id: modelId } = AircraftModelInputMapper.toDomain(input)

    const [model, aircraftCount] = await Promise.all([
      this.modelRepository.get(modelId),
      this.aircraftRepository.count(aircraftsOfModel(modelId))
    ])

    if (!model) {
      throw new EntityNotFoundError('AircraftModel', modelId.value)
    }

    model.remove(aircraftCount)

    await this.modelRepository.remove(modelId)
    await this.eventBus.publish(model.pullDomainEvents())
  }
}
