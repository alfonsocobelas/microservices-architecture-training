import { NumberValueObject } from 'src/contexts/shared/domain/value-objects/number-value-object'
import { ENGINE_DEFAULTS as DEFAULT } from '../engine-constants'

export class EngineCyclesSinceLastOverhaul extends NumberValueObject {
  protected static fieldName = 'Cycles since last overhaul'

  private constructor(value: number) {
    super(value)
  }

  static create(value: number): EngineCyclesSinceLastOverhaul {
    return new EngineCyclesSinceLastOverhaul(value)
  }

  static initial(): EngineCyclesSinceLastOverhaul {
    return new EngineCyclesSinceLastOverhaul(DEFAULT.CYCLES_SINCE_LAST_OVERHAUL)
  }
}
