import { v7 as uuidv7 } from 'uuid'
import { randomBoolean, randomEnumValue, randomString } from '@libs/testing'
import { RegisterIssueInput } from '../../../../../src/modules/issues/application/dtos/register-issue-input.dto'
import { IssuePartCategoryEnum, IssueSeverityLevelEnum } from '../../../../../src/modules/issues/domain/issue-enums'
import { ISSUE_CONSTRAINTS as LIMITS } from '../../../../../src/modules/issues/domain/issue-constants'

export class RegisterIssueInputMother {
  static create(overrides?: Partial<RegisterIssueInput>): RegisterIssueInput {
    return {
      id: uuidv7(),
      code: randomString(LIMITS.CODE.MIN_LENGTH, LIMITS.CODE.MAX_LENGTH),
      description: randomString(LIMITS.DESCRIPTION.MIN_LENGTH, LIMITS.DESCRIPTION.MAX_LENGTH),
      severity: randomEnumValue(IssueSeverityLevelEnum).toString(),
      partCategory: randomEnumValue(IssuePartCategoryEnum).toString(),
      requiresGrounding: randomBoolean(),
      ...overrides
    }
  }

  static random(): RegisterIssueInput {
    return this.create()
  }

  static engine(engineId = uuidv7()): RegisterIssueInput {
    return this.create({ engineId, partCategory: IssuePartCategoryEnum.ENGINE })
  }

  static avionics(aircraftId = uuidv7()): RegisterIssueInput {
    return this.create({ aircraftId, partCategory: IssuePartCategoryEnum.AVIONICS })
  }
}
