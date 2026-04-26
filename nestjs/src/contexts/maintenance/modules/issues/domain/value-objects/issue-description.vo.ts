import { StringValueObject } from 'src/contexts/shared/domain/value-objects/string-value-object'
import { IssueError } from '../issue-errors'
import { ISSUE_CONSTRAINTS as LIMITS } from '../issue-constants'

export class IssueDescription extends StringValueObject {
  protected static fieldName = 'Description'

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): IssueDescription {
    this.validate(value)
    return new IssueDescription(value)
  }

  private static validate(value: string): void {
    this.ensureIsString(value)

    if (value.length < LIMITS.DESCRIPTION.MIN_LENGTH) {
      throw new IssueError(`Description must be at least ${LIMITS.DESCRIPTION.MIN_LENGTH} characters`)
    }

    if (value.length > LIMITS.DESCRIPTION.MAX_LENGTH) {
      throw new IssueError(`Description must be less than or equal to ${LIMITS.DESCRIPTION.MAX_LENGTH} characters`)
    }
  }
}

