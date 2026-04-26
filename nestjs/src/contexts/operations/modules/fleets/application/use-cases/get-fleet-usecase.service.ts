import { Injectable } from '@nestjs/common'
import { EntityNotFoundError } from 'src/contexts/shared/errors'
import { FleetRepository } from '../../domain/fleet.repository'
import { GetFleetOutput } from '../dtos/get-fleet-output.dto'
import { GetFleetInput } from '../dtos/get-fleet-input.dto'
import { FleetId } from '../../domain/value-objects/fleet-id.vo'

@Injectable()
export class GetFleetUseCase {
  constructor(
    private readonly fleetRepository: FleetRepository
  ) {}

  async invoke(input: GetFleetInput): Promise<GetFleetOutput> {
    const fleetId = FleetId.create(input.id)

    const fleet = await this.fleetRepository.get(fleetId)
    if (!fleet) {
      throw new EntityNotFoundError('Fleet', fleetId.value)
    }

    return fleet.toPrimitives()
  }
}
