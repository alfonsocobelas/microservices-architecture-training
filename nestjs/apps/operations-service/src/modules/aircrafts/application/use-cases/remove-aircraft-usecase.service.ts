import { EventBus } from '@libs/shared/domain/event-bus/event-bus'
import { AircraftId } from '@libs/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { EntityNotFoundError } from '@libs/shared/errors'
import { RemoveAircraftInput } from '../dtos/remove-aircraft-input.dto'
import { AircraftRepository } from '../../domain/aircraft.repository'

export class RemoveAircraftUseCase {
  constructor(
    private readonly aircraftRepository: AircraftRepository,
    private readonly eventBus: EventBus
  ) {}

  async invoke(input: RemoveAircraftInput): Promise<void> {
    const aircraftId = AircraftId.create(input.id)

    const aircraft = await this.aircraftRepository.get(aircraftId)
    if (!aircraft) {
      throw new EntityNotFoundError('Aircraft', aircraftId.value)
    }

    aircraft.remove()

    await this.aircraftRepository.remove(aircraft)
    await this.eventBus.publish(aircraft.pullDomainEvents())
  }
}
