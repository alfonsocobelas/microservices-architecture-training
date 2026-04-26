import { FleetId } from 'src/contexts/operations/modules/fleets/domain/value-objects/fleet-id.vo'
import { UuidV7Mother } from '../../../shared/domain/mothers/uuidV7.mother'

export class FleetIdMother {
  static create(value: string): FleetId {
    return FleetId.create(value)
  }

  static random(): FleetId {
    return this.create(UuidV7Mother.random())
  }
}
