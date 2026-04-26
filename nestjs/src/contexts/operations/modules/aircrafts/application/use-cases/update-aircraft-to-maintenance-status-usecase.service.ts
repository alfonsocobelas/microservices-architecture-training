import { Injectable } from '@nestjs/common'
import { EventBus } from 'src/contexts/shared/domain/event-bus/event-bus'
import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { EntityNotFoundError } from 'src/contexts/shared/errors'
import { UpdateAircraftToMaintenanceStatusInput } from '../dtos/update-aircraft-to-maintenance-status-intput.dto'
import { AircraftRepository } from '../../domain/aircraft.repository'

@Injectable()
export class UpdateAircraftToMaintenanceStatusUseCase {
  constructor(
    private readonly aircraftRepository: AircraftRepository,
    private readonly eventBus: EventBus
  ) {}

  async invoke(input: UpdateAircraftToMaintenanceStatusInput): Promise<void> {
    const aircraftId = AircraftId.create(input.id)

    const aircraft = await this.aircraftRepository.get(aircraftId)
    if (!aircraft) {
      throw new EntityNotFoundError('Aircraft', aircraftId.value)
    }

    aircraft.updateStatusToMaintenance()

    await this.aircraftRepository.updateStatus(aircraftId, aircraft.status)
    this.eventBus.publish(aircraft.pullDomainEvents())
  }
}
