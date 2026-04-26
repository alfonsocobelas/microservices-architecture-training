import { Aircraft } from 'src/contexts/operations/modules/aircrafts/domain/aircraft'
import { FindAircraftsInMaintenanceOutput } from 'src/contexts/operations/modules/aircrafts/application/dtos/find-aircrafts-in-maintenance-output.dto'

export class FindAircraftsInMaintenanceOutputMother {
  static fromDomainList(aircrafts: Aircraft[]): FindAircraftsInMaintenanceOutput[] {
    return aircrafts.map(aircraft => (this.fromDomain(aircraft)))
  }

  static fromDomain(aircraft: Aircraft): FindAircraftsInMaintenanceOutput {
    return {
      id: aircraft.id.value,
      status: aircraft.status.value,
      modelId: aircraft.modelId.value,
      fleetId: aircraft.fleetId?.value,
      isActive: aircraft.isActive.value,
      engineIds: aircraft.engineIds.values,
      tailNumber: aircraft.tailNumber.value,
      totalFlightHours: aircraft.totalFlightHours.value,
      fuelLevelPercentage: aircraft.fuelLevelPercentage.value
    }
  }
}
