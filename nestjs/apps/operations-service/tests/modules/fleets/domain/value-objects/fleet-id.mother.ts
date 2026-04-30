import { UuidV7Mother } from '@libs/testing'
import { FleetId } from '../../../../../src/modules/fleets/domain/value-objects/fleet-id.vo'

export class FleetIdMother {
  static create(value: string): FleetId {
    return FleetId.create(value)
  }

  static random(): FleetId {
    return this.create(UuidV7Mother.random())
  }
}
