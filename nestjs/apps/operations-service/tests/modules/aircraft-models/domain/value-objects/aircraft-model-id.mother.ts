import { UuidV7Mother } from '@libs/testing'
import { AircraftModelId } from '../../../../../src/modules/aircraft-models/domain/value-objects/aircraft-model-id.vo'

export class AircraftModelIdMother {
  static create(value: string): AircraftModelId {
    return AircraftModelId.create(value)
  }

  static random(): AircraftModelId {
    return this.create(UuidV7Mother.random())
  }
}
