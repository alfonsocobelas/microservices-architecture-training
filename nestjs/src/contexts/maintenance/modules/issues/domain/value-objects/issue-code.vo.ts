import { StringValueObject } from 'src/contexts/shared/domain/value-objects/string-value-object'
import { IssueError } from '../issue-errors'
import { ISSUE_CONSTRAINTS as LIMITS } from '../issue-constants'

export class IssueCode extends StringValueObject {
  protected static fieldName = 'Issue code'

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): IssueCode {
    this.validate(value)
    return new IssueCode(value)
  }

  private static validate(value: string): void {
    this.ensureIsString(value)

    if (value.length < LIMITS.CODE.MIN_LENGTH) {
      throw new IssueError(`Code must be at least ${LIMITS.CODE.MIN_LENGTH} characters`)
    }

    if (value.length > LIMITS.CODE.MAX_LENGTH) {
      throw new IssueError(`Code must be less than or equal to ${LIMITS.CODE.MAX_LENGTH} characters`)
    }
  }
}
