import { FleetName } from 'src/contexts/operations/modules/fleets/domain/value-objects/fleet-name.vo'
import { StringMother } from '../../../shared/domain/mothers/string.mother'
import { FLEET_CONSTRAINTS as LIMITS } from 'src/contexts/operations/modules/fleets/domain/fleet-constants'

export class FleetNameMother {
  static create(value: string): FleetName {
    return FleetName.create(value)
  }

  static random(): FleetName {
    return this.create(StringMother.random({ minLength: LIMITS.NAME.MIN_LENGTH, maxLength: LIMITS.NAME.MAX_LENGTH }))
  }
}
