import { IntegerValueObject } from 'src/contexts/shared/domain/value-objects/integer-value-object'
import { FleetError } from '../fleet-errors'
import { FLEET_CONSTRAINTS as LIMITS } from '../fleet-constants'

export class FleetMaintenanceBudget extends IntegerValueObject {
  protected static fieldName = 'Maintenance budget'

  private constructor(value: number) {
    super(value)
  }

  static create(value: number): FleetMaintenanceBudget {
    this.validate(value)
    return new FleetMaintenanceBudget(value)
  }

  private static validate(value: number): void {
    this.ensureIsInteger(value)

    if (value < LIMITS.MAINTENANCE_BUDGET.MIN) {
      throw new FleetError(`Maintenance budget must be at least ${LIMITS.MAINTENANCE_BUDGET.MIN}`)
    }

    if (value > LIMITS.MAINTENANCE_BUDGET.MAX) {
      throw new FleetError(`Maintenance budget must be less than ${LIMITS.MAINTENANCE_BUDGET.MAX}`)
    }
  }
}
