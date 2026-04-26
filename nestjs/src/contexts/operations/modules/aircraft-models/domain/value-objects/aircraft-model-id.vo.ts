import { UuidV7ValueObject } from 'src/contexts/shared/domain/value-objects/uuidv7-value-object'

export class AircraftModelId extends UuidV7ValueObject {
  protected static fieldName = 'Aircraft model ID'

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): AircraftModelId {
    this.ensureIsValidUuidV7(value)
    return new AircraftModelId(value)
  }
}

