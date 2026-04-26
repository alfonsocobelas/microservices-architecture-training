import { Fleet } from 'src/contexts/operations/modules/fleets/domain/fleet'
import { FleetPrimitiveProps } from 'src/contexts/operations/modules/fleets/domain/fleet-types'
import { FleetStatusEnum } from 'src/contexts/operations/modules/fleets/domain/fleet-enums'
import { FleetBuilder } from './fleet.builder'
import { randomEnumValue } from '../../shared/utils/random-enum'
import { repeat } from '../../shared/utils/random-array'

export class FleetMother {
  static fromInput(input: Partial<FleetPrimitiveProps>): Fleet {
    return FleetBuilder.aFleet().withProps(input as Partial<FleetPrimitiveProps>).build()
  }

  static register(overrides?: Partial<FleetPrimitiveProps>): Fleet {
    return FleetBuilder.aFleet().withProps(overrides).create()
  }

  static reconstruct(overrides?: Partial<FleetPrimitiveProps>): Fleet {
    return FleetBuilder.aFleet().withProps(overrides).build()
  }

  static random(): Fleet {
    return FleetBuilder.aFleet().withStatus(randomEnumValue(FleetStatusEnum)).build()
  }

  static randomList(count: number = 5): Fleet[] {
    return repeat(() => this.random(), count)
  }

  static aircraftsFleet(aircraftIds: string[]): Fleet {
    return FleetBuilder
      .aFleet()
      .withAircraftIds(aircraftIds)
      .build()
  }
}
