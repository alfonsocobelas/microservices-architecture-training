import { BooleanValueObject } from 'src/contexts/shared/domain/value-objects/boolean-value-object'

export class AircraftIsActive extends BooleanValueObject {
  protected static fieldName = 'AircraftIsActive'

  private constructor(value: boolean) {
    super(value)
  }

  static create(value: boolean): AircraftIsActive {
    return new AircraftIsActive(value)
  }

  static inactive(): AircraftIsActive {
    return new AircraftIsActive(false)
  }

  static active(): AircraftIsActive {
    return new AircraftIsActive(true)
  }
}
