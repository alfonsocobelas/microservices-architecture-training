import { Injectable } from '@nestjs/common'
import { EventBus } from 'src/contexts/shared/domain/event-bus/event-bus'
import { AircraftRepository } from 'src/contexts/operations/modules/aircrafts/domain/aircraft.repository'
import { AlreadyExistsError, InvalidArgumentError } from 'src/contexts/shared/errors'
import { RegisterFleetInput } from '../dtos/register-fleet-input.dto'
import { Fleet } from '../../domain/fleet'
import { withName } from '../../domain/specifications/fleet-with-name.specification'
import { FleetRepository } from '../../domain/fleet.repository'
import { FleetInputMapper } from '../../domain/fleet-factory'

@Injectable()
export class RegisterFleetUseCase {
  constructor(
    private readonly fleetRepository: FleetRepository,
    private readonly aircraftRepository: AircraftRepository,
    private readonly eventBus: EventBus
  ) {}

  async invoke(input: RegisterFleetInput): Promise<void> {
    const props = FleetInputMapper.toDomain(input)
    const aircraftIds = props.aircraftIds.toArray

    const [aircrafts, fleetExists] = await Promise.all([
      this.aircraftRepository.find(aircraftIds),
      this.fleetRepository.exists(withName(props.name))
    ])

    if (fleetExists) {
      throw new AlreadyExistsError('Fleet', 'name', props.name.value)
    }

    if (!aircrafts.length) {
      throw new InvalidArgumentError('No aircrafts found with the provided IDs.')
    }

    if (aircrafts.length !== aircraftIds.length) {
      throw new InvalidArgumentError('Some aircraft IDs were not found.')
    }

    for (const aircraft of aircrafts) {
      aircraft.addToFleet(props.id)
    }

    const fleet = Fleet.create(props)

    await Promise.all([
      this.fleetRepository.register(fleet),
      this.aircraftRepository.save(aircrafts)
    ])

    await this.eventBus.publish([
      ...fleet.pullDomainEvents(),
      ...aircrafts.flatMap(aircraft => aircraft.pullDomainEvents())
    ])
  }
}
