import { AircraftModelId } from 'src/contexts/operations/modules/aircraft-models/domain/value-objects/aircraft-model-id.vo'
import { UuidV7Mother } from '../../../shared/domain/mothers/uuidV7.mother'

export class AircraftModelIdMother {
  static create(value: string): AircraftModelId {
    return AircraftModelId.create(value)
  }

  static random(): AircraftModelId {
    return this.create(UuidV7Mother.random())
  }
}
