import { UuidV7ValueObject } from '../uuidv7-value-object'

export class AircraftId extends UuidV7ValueObject {
  static fieldName = 'Aircraft ID'

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): AircraftId {
    this.ensureIsValidUuidV7(value)
    return new AircraftId(value)
  }
}
