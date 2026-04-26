import { AircraftModelNumEngines } from 'src/contexts/operations/modules/aircraft-models/domain/value-objects/aircraft-model-num-engines.vo'
import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { ValueObjectList } from 'src/contexts/shared/domain/value-objects/value-object-list'

export class AircraftEngineIds extends ValueObjectList<EngineId, AircraftEngineIds> {
  private constructor(engineIds: EngineId[]) {
    super(engineIds)
  }

  static create(engineIds: string[]): AircraftEngineIds {
    const vos = engineIds.map(id => EngineId.create(id))
    return new AircraftEngineIds(vos)
  }

  static empty(): AircraftEngineIds {
    return new AircraftEngineIds([])
  }

  isEmpty(): boolean {
    return this._items.length === 0
  }

  isFull(max: AircraftModelNumEngines): boolean {
    return this.length >= max.value
  }

  add(engineId: EngineId): AircraftEngineIds {
    return new AircraftEngineIds([...this._items, engineId])
  }

  remove(engineId: EngineId): AircraftEngineIds {
    return new AircraftEngineIds(this._items.filter(e => !e.equals(engineId)))
  }
}
