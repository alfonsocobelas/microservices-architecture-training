import { ListAircraftModelCatalogueOutput } from '../../../../../src/modules/aircraft-models/application/dtos/list-aircraft-model-catalogue-output.dto'
import { AircraftModel } from '../../../../../src/modules/aircraft-models/domain/aircraft-model'

export class ListAircraftModelCatalogueOutputMother {
  static fromDomain(domain: AircraftModel): ListAircraftModelCatalogueOutput {
    return {
      id: domain.id.value,
      code: domain.code.value,
      name: domain.name.value,
      manufacturer: domain.manufacturer.value,
      passengerCapacity: domain.passengerCapacity.value,
      numEngines: domain.numEngines.value,
      status: domain.status.value
    }
  }
}
