import { Fleet } from 'src/contexts/operations/modules/fleets/domain/fleet'
import { FleetEntity } from './typeorm-fleet.entity'

export class FleetMapper {
  static toDomain(entity: FleetEntity): Fleet {
    return Fleet.fromPrimitives({
      id: entity.id,
      name: entity.name,
      type: entity.type,
      status: entity.status,
      companyId: entity.companyId,
      aircraftIds: entity.aircraftIds,
      operationRegion: entity.operationRegion,
      maintenanceBudget: entity.maintenanceBudget
    })
  }

  static toPersistence(domain: Fleet): FleetEntity {
    const entity = new FleetEntity()

    entity.id = domain.id.value
    entity.type = domain.type.value
    entity.name = domain.name.value
    entity.status = domain.status.value
    entity.companyId = domain.companyId.value
    entity.aircraftIds = domain.aircraftIds.values
    entity.operationRegion = domain.operationRegion.value
    entity.maintenanceBudget = domain.maintenanceBudget.value

    return entity
  }
}
