import { EnumValueObject } from 'src/contexts/shared/domain/value-objects/enum-value-object'
import { IssuePartCategoryEnum, IssuePartCategoryValue } from '../issue-enums'
import { IssueError } from '../issue-errors'

export class IssuePartCategory extends EnumValueObject<IssuePartCategoryEnum> {
  protected static fieldName = 'Issue part category'

  private constructor(value: IssuePartCategoryEnum) {
    super(value, IssuePartCategoryValue)
  }

  static create(value: string, aircraftId?: string, engineId?: string): IssuePartCategory {
    this.validate(value, aircraftId, engineId)
    return new IssuePartCategory(value as IssuePartCategoryEnum)
  }

  private static validate(value: string, aircraftId?: string, engineId?: string): void {
    this.ensureIsValidEnum(value as IssuePartCategoryEnum, IssuePartCategoryValue)

    if ((value === IssuePartCategoryEnum.AVIONICS || value === IssuePartCategoryEnum.FUSELAGE) && !aircraftId) {
      throw new IssueError('aircraftId is required when partCategory is Aircraft')
    }

    if (value === IssuePartCategoryEnum.ENGINE && !engineId) {
      throw new IssueError('engineId is required when partCategory is ENGINE')
    }
  }

  isEngine(): boolean {
    return this.value === IssuePartCategoryEnum.ENGINE
  }

  isFuselage(): boolean {
    return this.value === IssuePartCategoryEnum.FUSELAGE
  }

  isAvionics(): boolean {
    return this.value === IssuePartCategoryEnum.AVIONICS
  }
}
