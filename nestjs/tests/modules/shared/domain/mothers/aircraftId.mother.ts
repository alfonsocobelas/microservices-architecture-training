import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { UuidV7Mother } from './uuidV7.mother'

export class AircraftIdMother {
  static create(value: string): AircraftId {
    return AircraftId.create(value)
  }

  static random(): AircraftId {
    return this.create(UuidV7Mother.random())
  }
}
