import { Injectable } from '@nestjs/common'
import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { EngineRepository } from 'src/contexts/operations/modules/engines/domain/engine.repository'
import { EntityNotFoundError } from 'src/contexts/shared/errors'
import { AircraftModelRepository } from 'src/contexts/operations/modules/aircraft-models/domain/aircraft-model.repository'
import { GetAircraftInput } from '../dtos/get-aircraft-input.dto'
import { GetAircraftOutput } from '../dtos/get-aircraft-output.dto'
import { AircraftRepository } from '../../domain/aircraft.repository'

@Injectable()
export class GetAircraftUseCase {
  constructor(
    private readonly aircraftRepository: AircraftRepository,
    private readonly aircraftModelRepository: AircraftModelRepository,
    private readonly engineRepository: EngineRepository
  ) {}

  async invoke(input: GetAircraftInput): Promise<GetAircraftOutput> {
    const aircraftId = AircraftId.create(input.id)

    const aircraft = await this.aircraftRepository.get(aircraftId)
    if (!aircraft) {
      throw new EntityNotFoundError('Aircraft', aircraftId.value)
    }

    const model = await this.aircraftModelRepository.get(aircraft.modelId)
    if (!model) {
      throw new EntityNotFoundError('AircraftModel', aircraft.modelId.value)
    }

    let engines
    if (!aircraft.engineIds.isEmpty()) {
      engines = await this.engineRepository.find(aircraft.engineIds.toArray)
    }

    return {
      id: aircraft.id.value,
      modelId: aircraft.modelId.value,
      tailNumber: aircraft.tailNumber.value,
      fleetId: aircraft.fleetId?.value,
      engineIds: aircraft.engineIds?.values,
      isActive: aircraft.isActive.value,
      status: aircraft.status.value,
      totalFlightHours: aircraft.totalFlightHours.value,
      fuelLevelPercentage: aircraft.fuelLevelPercentage.value,
      model: {
        id: model.id.value,
        name: model.name.value,
        numEngines: model.numEngines.value
      },
      engines: engines?.map(engine => ({
        id: engine.id.value,
        healthScore: engine.healthScore.value
      }))
    }
  }
}
