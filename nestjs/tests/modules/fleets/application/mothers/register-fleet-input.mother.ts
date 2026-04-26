import { v7 as uuidv7 } from 'uuid'
import { RegisterFleetInput } from 'src/contexts/operations/modules/fleets/application/dtos/register-fleet-input.dto'
import { FleetTypeEnum, FleetOperationRegionEnum } from 'src/contexts/operations/modules/fleets/domain/fleet-enums'
import { FLEET_CONSTRAINTS as LIMITS } from 'src/contexts/operations/modules/fleets/domain/fleet-constants'
import { randomString } from '../../../shared/utils/random-string'
import { randomNumber } from '../../../shared/utils/random-number'
import { randomEnumValue } from '../../../shared/utils/random-enum'

export class RegisterFleetInputMother {
  static create(overrides?: Partial<RegisterFleetInput>): RegisterFleetInput {
    return {
      id: uuidv7(),
      companyId: uuidv7(),
      aircraftIds: [uuidv7(), uuidv7()],
      name: randomString(LIMITS.NAME.MIN_LENGTH, LIMITS.NAME.MAX_LENGTH),
      maintenanceBudget: randomNumber(LIMITS.MAINTENANCE_BUDGET.MIN, LIMITS.MAINTENANCE_BUDGET.MAX),
      type: randomEnumValue(FleetTypeEnum).toString(),
      operationRegion: randomEnumValue(FleetOperationRegionEnum).toString(),
      ...overrides
    }
  }

  static random(): RegisterFleetInput {
    return this.create()
  }

  static withExistingAircraftIds(aircraftIds: string[]): RegisterFleetInput {
    return this.create({ aircraftIds })
  }
}
