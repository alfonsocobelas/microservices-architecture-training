import { v7 as uuidv7 } from 'uuid'
import { Aircraft } from 'src/contexts/operations/modules/aircrafts/domain/aircraft'
import { AircraftStatusEnum } from 'src/contexts/operations/modules/aircrafts/domain/aircraft-enums'
import { RegisterAircraftInput } from 'src/contexts/operations/modules/aircrafts/application/dtos/register-aircraft-input.dto'
import { AircraftPrimitiveProps } from 'src/contexts/operations/modules/aircrafts/domain/aircraft-types'
import { AircraftBuilder } from './aircraft.builder'
import { repeat } from '../../shared/utils/random-array'
import { randomBoolean } from '../../shared/utils/random-boolean'
import { randomEnumValue } from '../../shared/utils/random-enum'

export class AircraftMother {
  static fromInput(input: Partial<AircraftPrimitiveProps>): Aircraft {
    return AircraftBuilder.anAircraft().withProps(input as Partial<AircraftPrimitiveProps>).build()
  }

  static register(overrides?: Partial<AircraftPrimitiveProps>): Aircraft {
    return AircraftBuilder.anAircraft().withProps(overrides).create()
  }

  static reconstruct(overrides?: Partial<AircraftPrimitiveProps>): Aircraft {
    return AircraftBuilder.anAircraft().withProps(overrides).build()
  }

  static random(): Aircraft {
    return AircraftBuilder
      .anAircraft()
      .withStatus(randomEnumValue(AircraftStatusEnum))
      .withIsActive(randomBoolean())
      .build()
  }

  static randomList(count: number = 5): Aircraft[] {
    return repeat(() => this.random(), count)
  }

  static initial(overrides: RegisterAircraftInput): Aircraft {
    return AircraftBuilder
      .anAircraft()
      .withId(overrides.id)
      .withModelId(overrides.modelId)
      .withTailNumber(overrides.tailNumber)
      .build()
  }

  static activeInFlight(aircraftId: string = uuidv7()): Aircraft {
    return AircraftBuilder
      .anAircraft()
      .withId(aircraftId)
      .withStatus(AircraftStatusEnum.ACTIVE)
      .withEngineIds([uuidv7(), uuidv7()])
      .withFleetId(uuidv7())
      .withFlightHours(500)
      .withIsActive(true)
      .build()
  }

  static inMaintenance() {
    return AircraftBuilder
      .anAircraft()
      .withStatus(AircraftStatusEnum.MAINTENANCE)
      .withFleetId(uuidv7())
      .withIsActive(false)
      .build()
  }

  static orfan() {
    return AircraftBuilder
      .anAircraft()
      .withStatus(AircraftStatusEnum.STORED)
      .withEngineIds([uuidv7(), uuidv7()])
      .withIsActive(false)
      .build()
  }

  static free(aircraftId: string = uuidv7()): Aircraft {
    return AircraftBuilder
      .anAircraft()
      .withId(aircraftId)
      .withEngineIds([])
      .withStatus(AircraftStatusEnum.ACTIVE)
      .withIsActive(true)
      .build()
  }
}
