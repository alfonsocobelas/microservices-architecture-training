
import { StringMother } from '@libs/testing'
import { FLEET_CONSTRAINTS as LIMITS } from '../../../../../src/modules/fleets/domain/fleet-constants'
import { FleetName } from '../../../../../src/modules/fleets/domain/value-objects/fleet-name.vo'

export class FleetNameMother {
  static create(value: string): FleetName {
    return FleetName.create(value)
  }

  static random(): FleetName {
    return this.create(StringMother.random({ minLength: LIMITS.NAME.MIN_LENGTH, maxLength: LIMITS.NAME.MAX_LENGTH }))
  }
}
