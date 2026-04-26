import { v7 as uuidv7 } from 'uuid'
import { Engine } from 'src/contexts/operations/modules/engines/domain/engine'
import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { EngineStatusEnum } from 'src/contexts/operations/modules/engines/domain/engine-enums'
import { EngineSerialNumber } from 'src/contexts/operations/modules/engines/domain/value-objects/engine-serial-number.vo'
import { EnginePrimitiveProps } from 'src/contexts/operations/modules/engines/domain/engine-types'
import { ENGINE_DEFAULTS as DEFAULT, ENGINE_CONSTRAINTS as LIMITS } from 'src/contexts/operations/modules/engines/domain/engine-constants'
import { randomString } from '../../shared/utils/random-string'
import { randomNumber } from '../../shared/utils/random-number'

/**
 * IMPORTANT: In integration tests, be careful with fields that have uniqueness constraints.
 * You must set them manually to avoid collisions with other objects created in the database
 *  during test execution.
 */
export class EngineBuilder {
  private props: EnginePrimitiveProps = {
    id: uuidv7(),
    serialNumber: randomString(LIMITS.SERIAL_NUMBER.MIN_LENGTH, LIMITS.SERIAL_NUMBER.MAX_LENGTH).trim().toUpperCase(),
    healthScore: randomNumber(LIMITS.HEALTH_SCORE.MIN, LIMITS.HEALTH_SCORE.MAX),
    flyingHoursAccumulated: DEFAULT.FLYING_HOURS,
    cyclesSinceLastOverhaul: DEFAULT.CYCLES_SINCE_LAST_OVERHAUL,
    status: EngineStatusEnum.OPERATIONAL,
    isInstalled: false
  }

  static anEngine(): EngineBuilder {
    return new EngineBuilder()
  }

  withId(id: string) {
    this.props.id = id
    return this
  }

  withSerialNumber(sn: string) {
    this.props.serialNumber = sn
    return this
  }

  withStatus(status: EngineStatusEnum) {
    this.props.status = status
    return this
  }

  withHealth(score: number) {
    this.props.healthScore = score
    return this
  }

  withAircraftId(aircraftId: string) {
    this.props.isInstalled = true
    this.props.aircraftId = aircraftId
    return this
  }

  withIsInstalled(isInstalled: boolean) {
    this.props.isInstalled = isInstalled
    return this
  }

  withProps(overrides?: Partial<EnginePrimitiveProps>): EngineBuilder {
    this.props = { ...this.props, ...overrides }
    return this
  }

  create(): Engine {
    return Engine.create({
      id: EngineId.create(this.props.id),
      serialNumber: EngineSerialNumber.create(this.props.serialNumber)
    })
  }

  build(): Engine {
    return Engine.fromPrimitives(this.props)
  }
}
