import { AircraftEntity } from './typeorm-aircraft.entity'
import { Aircraft } from '../../../domain/aircraft'

export class AircraftMapper {
  static toDomain(entity: AircraftEntity): Aircraft {
    return Aircraft.fromPrimitives({
      id: entity.id,
      status: entity.status,
      fleetId: entity.fleetId ?? undefined,
      modelId: entity.modelId,
      isActive: entity.isActive,
      engineIds: entity.engineIds,
      tailNumber: entity.tailNumber,
      totalFlightHours: entity.totalFlightHours,
      fuelLevelPercentage: entity.fuelLevelPercentage
    })
  }

  static toPersistence(domain: Aircraft): AircraftEntity {
    const entity = new AircraftEntity()

    entity.id = domain.id.value
    entity.status = domain.status.value
    entity.fleetId = domain.fleetId?.value ?? null
    entity.modelId = domain.modelId.value
    entity.isActive = domain.isActive.value
    entity.engineIds = domain.engineIds.values
    entity.tailNumber = domain.tailNumber.value
    entity.totalFlightHours = domain.totalFlightHours.value
    entity.fuelLevelPercentage = domain.fuelLevelPercentage.value

    return entity
  }
}
