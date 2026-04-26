import { Injectable } from '@nestjs/common'
import { EventBus } from 'src/contexts/shared/domain/event-bus/event-bus'
import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { FleetRepository } from 'src/contexts/operations/modules/fleets/domain/fleet.repository'
import { AircraftRepository } from 'src/contexts/operations/modules/aircrafts/domain/aircraft.repository'
import { EntityNotFoundError } from 'src/contexts/shared/errors'
import { RetireAircraftFromFleetInput } from '../dtos/retire-aircraft-from-fleet-input'
import { FleetId } from '../../domain/value-objects/fleet-id.vo'

@Injectable()
export class RetireAircraftFromFleetUsecase {
  constructor(
    private readonly fleetRepository: FleetRepository,
    private readonly aircraftRepository: AircraftRepository,
    private readonly eventBus: EventBus
  ) {}

  async invoke(input: RetireAircraftFromFleetInput): Promise<void> {
    const fleetId = FleetId.create(input.fleetId)
    const aircraftId = AircraftId.create(input.aircraftId)

    const [fleet, aircraft] = await Promise.all([
      this.fleetRepository.get(fleetId),
      this.aircraftRepository.get(aircraftId)
    ])

    if (!fleet) {
      throw new EntityNotFoundError('Fleet', input.fleetId)
    }

    if (!aircraft) {
      throw new EntityNotFoundError('Aircraft', input.aircraftId)
    }

    aircraft.retireFromFleet(fleetId)
    fleet.retireAircraft(aircraftId)

    await Promise.all([
      this.aircraftRepository.save(aircraft),
      this.fleetRepository.save(fleet)
    ])

    await this.eventBus.publish([...aircraft.pullDomainEvents(), ...fleet.pullDomainEvents()])
  }
}
