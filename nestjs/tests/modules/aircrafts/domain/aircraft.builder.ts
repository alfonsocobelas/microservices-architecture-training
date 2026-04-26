import { v7 as uuidv7 } from 'uuid'
import { Aircraft } from 'src/contexts/operations/modules/aircrafts/domain/aircraft'
import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { AircraftModelId } from 'src/contexts/operations/modules/aircraft-models/domain/value-objects/aircraft-model-id.vo'
import { AircraftTailNumber } from 'src/contexts/operations/modules/aircrafts/domain/value-objects/aircraft-tail-number.vo'
import { AircraftStatusEnum } from 'src/contexts/operations/modules/aircrafts/domain/aircraft-enums'
import { AircraftPrimitiveProps } from 'src/contexts/operations/modules/aircrafts/domain/aircraft-types'
import { AIRCRAFT_DEFAULTS as DEFAULT,AIRCRAFT_CONSTRAINTS as LIMITS } from 'src/contexts/operations/modules/aircrafts/domain/aircraft-constants'
import { randomString } from '../../shared/utils/random-string'
import { randomNumber } from '../../shared/utils/random-number'

/**
 * IMPORTANT: In integration tests, be careful with fields that have uniqueness constraints.
 * You must set them manually to avoid collisions with other objects created in the database
 *  during test execution.
 */
export class AircraftBuilder {
  private props: AircraftPrimitiveProps = {
    id: uuidv7(),
    modelId: uuidv7(),
    engineIds: DEFAULT.INITIAL_ENGINE_IDS,
    tailNumber: randomString(LIMITS.TAIL_NUMBER.MIN_LENGTH, LIMITS.TAIL_NUMBER.MAX_LENGTH).trim().toUpperCase(),
    totalFlightHours: randomNumber(LIMITS.FLIGHT_HOURS.MIN, LIMITS.FLIGHT_HOURS.MAX),
    fuelLevelPercentage: randomNumber(LIMITS.FUEL_LEVEL.MIN, LIMITS.FUEL_LEVEL.MAX),
    status: AircraftStatusEnum.DRAFT,
    isActive: false
  }

  static anAircraft(): AircraftBuilder {
    return new AircraftBuilder()
  }

  withId(id: string): AircraftBuilder {
    this.props.id = id
    return this
  }

  withModelId(id: string): AircraftBuilder {
    this.props.modelId = id
    return this
  }

  withTailNumber(tail: string): AircraftBuilder {
    this.props.tailNumber = tail
    return this
  }

  withStatus(status: AircraftStatusEnum): AircraftBuilder {
    this.props.status = status
    return this
  }

  withEngineIds(ids: string[]): AircraftBuilder {
    this.props.engineIds = ids
    return this
  }

  withFlightHours(hours: number): AircraftBuilder {
    this.props.totalFlightHours = hours
    return this
  }

  withFuelLevel(percentage: number): AircraftBuilder {
    this.props.fuelLevelPercentage = percentage
    return this
  }

  withFleetId(fleetId: string): AircraftBuilder {
    this.props.fleetId = fleetId
    return this
  }

  withIsActive(isActive: boolean): AircraftBuilder {
    this.props.isActive = isActive
    return this
  }

  withProps(overrides?: Partial<AircraftPrimitiveProps>): AircraftBuilder {
    this.props = { ...this.props, ...overrides }
    return this
  }

  create(): Aircraft {
    return Aircraft.create({
      id: AircraftId.create(this.props.id),
      modelId: AircraftModelId.create(this.props.modelId),
      tailNumber: AircraftTailNumber.create(this.props.tailNumber)
    })
  }

  build(): Aircraft {
    return Aircraft.fromPrimitives(this.props)
  }
}
