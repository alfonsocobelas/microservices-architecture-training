import { Engine } from 'src/contexts/operations/modules/engines/domain/engine'
import { EngineEntity } from './typeorm-engine.entity'

export class EngineMapper {
  static toDomain(entity: EngineEntity): Engine {
    return Engine.fromPrimitives({
      id: entity.id,
      status: entity.status,
      aircraftId: entity.aircraftId ?? undefined,
      isInstalled: entity.isInstalled,
      healthScore: entity.healthScore,
      serialNumber: entity.serialNumber,
      flyingHoursAccumulated: entity.flyingHoursAccumulated,
      cyclesSinceLastOverhaul: entity.cyclesSinceLastOverhaul
    })
  }

  static toPersistence(domain: Engine): EngineEntity {
    const entity = new EngineEntity()

    entity.id = domain.id.value
    entity.status = domain.status.value
    entity.aircraftId = domain.aircraftId?.value ?? null
    entity.healthScore = domain.healthScore.value
    entity.isInstalled = domain.isInstalled.value
    entity.serialNumber = domain.serialNumber.value
    entity.flyingHoursAccumulated = domain.flyingHoursAccumulated.value
    entity.cyclesSinceLastOverhaul = domain.cyclesSinceLastOverhaul.value

    return entity
  }
}
