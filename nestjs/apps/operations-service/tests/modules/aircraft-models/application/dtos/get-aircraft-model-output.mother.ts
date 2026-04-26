import { GetAircraftModelOutput } from 'src/contexts/operations/modules/aircraft-models/application/dtos/get-aircraft-model-output.dto'
import { AircraftModel } from 'src/contexts/operations/modules/aircraft-models/domain/aircraft-model'

export class GetAircraftModelOutputMother {
  static fromDomain(aircraftModel: AircraftModel): GetAircraftModelOutput {
    return {
      id: aircraftModel.id.value,
      name: aircraftModel.name.value,
      code: aircraftModel.code.value,
      manufacturer: aircraftModel.manufacturer.value,
      passengerCapacity: aircraftModel.passengerCapacity.value,
      numEngines: aircraftModel.numEngines.value,
      status: aircraftModel.status.value
    }
  }
}
