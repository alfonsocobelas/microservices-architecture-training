import { Engine } from 'src/contexts/operations/modules/engines/domain/engine'
import { Aircraft } from 'src/contexts/operations/modules/aircrafts/domain/aircraft'
import { AircraftModel } from 'src/contexts/operations/modules/aircraft-models/domain/aircraft-model'
import { GetAircraftOutput } from 'src/contexts/operations/modules/aircrafts/application/dtos/get-aircraft-output.dto'

export class GetAircraftOutputMother {
  static fromDomain(aircraft: Aircraft, model: AircraftModel, engines: Engine[]): GetAircraftOutput {
    return {
      id: aircraft.id.value,
      modelId: aircraft.modelId.value,
      tailNumber: aircraft.tailNumber.value,
      fleetId: aircraft.fleetId?.value,
      engineIds: aircraft.engineIds.values,
      isActive: aircraft.isActive.value,
      totalFlightHours: aircraft.totalFlightHours.value,
      fuelLevelPercentage: aircraft.fuelLevelPercentage.value,
      status: aircraft.status.value,
      model: {
        id: model.id.value,
        name: model.name.value,
        numEngines: model.numEngines.value
      },
      engines: engines.map(engine=> ({
        id: engine.id.value,
        healthScore: engine.healthScore.value
      }))
    }
  }
}
