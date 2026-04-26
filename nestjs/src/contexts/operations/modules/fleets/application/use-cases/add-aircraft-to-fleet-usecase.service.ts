import { Injectable } from '@nestjs/common'
import { EventBus } from 'src/contexts/shared/domain/event-bus/event-bus'
import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { FleetRepository } from 'src/contexts/operations/modules/fleets/domain/fleet.repository'
import { EntityNotFoundError } from 'src/contexts/shared/errors'
import { AircraftRepository } from '../../../aircrafts/domain/aircraft.repository'
import { AddAircraftToFleetInput } from '../dtos/add-aircraft-to-fleet-input.dto'
import { FleetId } from '../../domain/value-objects/fleet-id.vo'

@Injectable()
export class AddAircraftToFleetUsecase {
  constructor(
    private readonly fleetRepository: FleetRepository,
    private readonly aircraftRepository: AircraftRepository,
    private readonly eventBus: EventBus
  ) {}

  async invoke(input: AddAircraftToFleetInput): Promise<void> {
    const fleetId = FleetId.create(input.fleetId)
    const aircraftId = AircraftId.create(input.aircraftId)

    const [fleet, aircraft] = await Promise.all([
      this.fleetRepository.get(fleetId),
      this.aircraftRepository.get(aircraftId)
    ])

    if (!fleet) {
      throw new EntityNotFoundError('Fleet', fleetId.value)
    }

    if (!aircraft) {
      throw new EntityNotFoundError('Aircraft', aircraftId.value)
    }

    aircraft.addToFleet(fleetId)
    fleet.addAircraft(aircraftId)

    await Promise.all([
      this.aircraftRepository.save(aircraft),
      this.fleetRepository.save(fleet)
    ])

    await this.eventBus.publish([...aircraft.pullDomainEvents(), ...fleet.pullDomainEvents()])
  }
}
