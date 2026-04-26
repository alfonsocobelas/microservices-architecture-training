import { NumberValueObject } from 'src/contexts/shared/domain/value-objects/number-value-object'
import { ENGINE_DEFAULTS as DEFAULT } from '../engine-constants'

export class EngineFlyingHoursAccumulated extends NumberValueObject {
  protected static fieldName = 'Flying hours accumulated'

  private constructor(value: number) {
    super(value)
  }

  static create(value: number): EngineFlyingHoursAccumulated {
    return new EngineFlyingHoursAccumulated(value)
  }

  static initial(): EngineFlyingHoursAccumulated {
    return new EngineFlyingHoursAccumulated(DEFAULT.FLYING_HOURS)
  }
}
