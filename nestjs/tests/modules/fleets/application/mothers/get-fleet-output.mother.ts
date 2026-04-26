import { GetFleetOutput } from 'src/contexts/operations/modules/fleets/application/dtos/get-fleet-output.dto'
import { Fleet } from 'src/contexts/operations/modules/fleets/domain/fleet'

export class GetFleetOutputMother {
  static fromDomain(fleet: Fleet): GetFleetOutput {
    return {
      id: fleet.id.value,
      name: fleet.name.value,
      companyId: fleet.companyId.value,
      aircraftIds: fleet.aircraftIds.values,
      operationRegion: fleet.operationRegion.value,
      type: fleet.type.value,
      maintenanceBudget: fleet.maintenanceBudget.value,
      status: fleet.status.value
    }
  }
}
