import { NumberValueObject } from 'src/contexts/shared/domain/value-objects/number-value-object'
import { ENGINE_CONSTRAINTS as LIMITS } from '../engine-constants'

export class EngineHealthScore extends NumberValueObject {
  protected static fieldName = 'Health score'

  private constructor(value: number) {
    super(value)
  }

  static create(value: number): EngineHealthScore {
    return new EngineHealthScore(value)
  }

  static max(): EngineHealthScore {
    return new EngineHealthScore(LIMITS.HEALTH_SCORE.MAX)
  }
}
