import { AircraftStatusEnum } from 'src/contexts/operations/modules/aircrafts/domain/aircraft-enums'
import { AircraftStatus } from 'src/contexts/operations/modules/aircrafts/domain/value-objects/aircraft-status.vo'
import { randomEnumValue } from '../../../shared/utils/random-enum'

export class AircraftStatusMother {
  static create(value: AircraftStatusEnum): AircraftStatus {
    return AircraftStatus.create(value)
  }

  static random(): AircraftStatus {
    return this.create(randomEnumValue(AircraftStatusEnum))
  }
}
