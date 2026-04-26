import { Nullable } from 'src/contexts/shared/types'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { EngineStatus } from './value-objects/engine-status.vo'
import { EngineSerialNumber } from './value-objects/engine-serial-number.vo'
import { Engine } from './engine'

export abstract class EngineRepository {
  abstract register(engine: Engine): Promise<void>
  abstract save(engines: Engine | Engine[]): Promise<void>
  abstract get(engineId: EngineId): Promise<Nullable<Engine>>
  abstract find(engineIds: EngineId[]): Promise<Engine[]>
  abstract exists(serialNumber: EngineSerialNumber): Promise<boolean>
  abstract matching(criteria: Criteria): Promise<Engine[]>
  abstract updateStatus(engineId: EngineId, status: EngineStatus): Promise<void>
}
