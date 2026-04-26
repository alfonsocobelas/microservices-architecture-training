import { BooleanValueObject } from 'src/contexts/shared/domain/value-objects/boolean-value-object'

export class EngineIsInstalled extends BooleanValueObject {
  protected static fieldName = 'EngineIsInstalled'

  private constructor(value: boolean) {
    super(value)
  }

  static create(value: boolean): EngineIsInstalled {
    return new EngineIsInstalled(value)
  }

  isInstalled(): boolean {
    return this._value
  }

  notInstalled(): boolean {
    return !this._value
  }

  static notInstalled(): EngineIsInstalled {
    return new EngineIsInstalled(false)
  }

  static installed(): EngineIsInstalled {
    return new EngineIsInstalled(true)
  }
}
