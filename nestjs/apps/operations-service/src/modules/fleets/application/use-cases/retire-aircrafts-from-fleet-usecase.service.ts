import { Injectable } from '@nestjs/common'
import { EventBus } from '@libs/shared/domain/event-bus/event-bus'
import { AircraftId } from '@libs/shared/domain/value-objects/aircrafts/aircraft-id.vo'

import { EntityNotFoundError, InvalidArgumentError } from '@libs/shared/errors'
import { RetireAircraftsFromFleetInput } from '../dtos/retire-aircrafts-from-fleet-input.dto'
import { FleetId } from '../../domain/value-objects/fleet-id.vo'
import { AircraftRepository } from '../../../aircrafts/domain/aircraft.repository'
import { FleetRepository } from '../../domain/fleet.repository'

@Injectable()
export class RetireAircraftsFromFleetUsecase {
  constructor(
    private readonly fleetRepository: FleetRepository,
    private readonly aircraftRepository: AircraftRepository,
    private readonly eventBus: EventBus
  ) {}

  async invoke(input: RetireAircraftsFromFleetInput): Promise<void> {
    const fleetId = FleetId.create(input.fleetId)
    const aircraftIds = input.aircraftIds.map(id => AircraftId.create(id))

    const [fleet, aircrafts] = await Promise.all([
      this.fleetRepository.get(fleetId),
      this.aircraftRepository.find(aircraftIds)
    ])

    if (!fleet) {
      throw new EntityNotFoundError('Fleet', input.fleetId)
    }

    if (!aircrafts.length) {
      throw new InvalidArgumentError('No aircrafts found with the provided IDs.')
    }

    if (aircrafts.length !== aircraftIds.length) {
      throw new InvalidArgumentError('Some aircraft IDs were not found')
    }

    // todo: mover al aggregado
    for (const aircraft of aircrafts) {
      aircraft.retireFromFleet(fleetId)
      fleet.retireAircraft(aircraft.id)
    }

    await Promise.all([
      this.aircraftRepository.save(aircrafts),
      this.fleetRepository.save(fleet)
    ])

    await this.eventBus.publish([
      ...fleet.pullDomainEvents(),
      ...aircrafts.flatMap(aircraft => aircraft.pullDomainEvents())
    ])
  }
}
