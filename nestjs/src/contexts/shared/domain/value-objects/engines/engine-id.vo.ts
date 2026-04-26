import { UuidV7ValueObject } from 'src/contexts/shared/domain/value-objects/uuidv7-value-object'

export class EngineId extends UuidV7ValueObject {
  protected static fieldName = 'Engine ID'

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): EngineId {
    this.ensureIsValidUuidV7(value)
    return new EngineId(value)
  }
}
