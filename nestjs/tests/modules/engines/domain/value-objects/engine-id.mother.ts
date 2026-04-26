import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { UuidV7Mother } from '../../../shared/domain/mothers/uuidV7.mother'

export class EngineIdMother {
  static create(value: string): EngineId {
    return EngineId.create(value)
  }

  static random(): EngineId {
    return this.create(UuidV7Mother.random())
  }
}
