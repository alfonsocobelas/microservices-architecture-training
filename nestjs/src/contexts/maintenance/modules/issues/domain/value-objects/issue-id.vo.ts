import { UuidV7ValueObject } from 'src/contexts/shared/domain/value-objects/uuidv7-value-object'

export class IssueId extends UuidV7ValueObject {
  protected static fieldName = 'Issue ID'

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): IssueId {
    this.ensureIsValidUuidV7(value)
    return new IssueId(value)
  }
}
