import { EnumValueObject } from 'src/contexts/shared/domain/value-objects/enum-value-object'
import { IssueSeverityLevelEnum, IssueSeverityLevelValue } from '../issue-enums'

export class IssueSeverityLevel extends EnumValueObject<IssueSeverityLevelEnum> {
  protected static fieldName = 'Issue severity level'

  private constructor(value: IssueSeverityLevelEnum) {
    super(value, IssueSeverityLevelValue)
  }

  static create(value: string): IssueSeverityLevel {
    this.ensureIsValidEnum(value as IssueSeverityLevelEnum, IssueSeverityLevelValue)
    return new IssueSeverityLevel(value as IssueSeverityLevelEnum)
  }

  isLow(): boolean {
    return this.value === IssueSeverityLevelEnum.LOW
  }

  isMedium(): boolean {
    return this.value === IssueSeverityLevelEnum.MEDIUM
  }

  isHigh(): boolean {
    return this.value === IssueSeverityLevelEnum.HIGH
  }
}
