import { UuidV7ValueObject } from 'src/contexts/shared/domain/value-objects/uuidv7-value-object'

export class FleetId extends UuidV7ValueObject {
  protected static fieldName = 'Fleet ID'

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): FleetId {
    this.ensureIsValidUuidV7(value)
    return new FleetId(value)
  }
}
