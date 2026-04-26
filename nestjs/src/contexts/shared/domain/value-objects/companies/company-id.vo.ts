import { UuidV7ValueObject } from 'src/contexts/shared/domain/value-objects/uuidv7-value-object'

export class CompanyId extends UuidV7ValueObject {
  protected static fieldName = 'Company ID'

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): CompanyId {
    this.ensureIsValidUuidV7(value)
    return new CompanyId(value)
  }
}
