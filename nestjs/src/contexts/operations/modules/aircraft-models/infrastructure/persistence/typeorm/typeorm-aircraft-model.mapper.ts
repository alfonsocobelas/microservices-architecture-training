
import { AircraftModelEntity } from './typeorm-aircraft-model.entity'
import { AircraftModel } from '../../../domain/aircraft-model'

export abstract class AircraftModelMapper {
  static toDomain(entity: AircraftModelEntity): AircraftModel {
    return AircraftModel.fromPrimitives({
      id: entity.id,
      name: entity.name,
      code: entity.code,
      status: entity.status,
      numEngines: entity.numEngines,
      manufacturer: entity.manufacturer,
      passengerCapacity: entity.passengerCapacity
    })
  }

  static toPersistence(domain: AircraftModel): AircraftModelEntity {
    const entity = new AircraftModelEntity()

    entity.id = domain.id.value
    entity.name = domain.name.value
    entity.code = domain.code.value
    entity.status = domain.status.value
    entity.numEngines = domain.numEngines.value
    entity.manufacturer = domain.manufacturer.value
    entity.passengerCapacity = domain.passengerCapacity.value

    return entity
  }
}
