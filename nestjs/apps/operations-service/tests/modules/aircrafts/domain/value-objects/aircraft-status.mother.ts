import { randomEnumValue } from '@libs/testing'
import { AircraftStatusEnum } from '../../../../../src/modules/aircrafts/domain/aircraft-enums'
import { AircraftStatus } from '../../../../../src/modules/aircrafts/domain/value-objects/aircraft-status.vo'

export class AircraftStatusMother {
  static create(value: AircraftStatusEnum): AircraftStatus {
    return AircraftStatus.create(value)
  }

  static random(): AircraftStatus {
    return this.create(randomEnumValue(AircraftStatusEnum))
  }
}
