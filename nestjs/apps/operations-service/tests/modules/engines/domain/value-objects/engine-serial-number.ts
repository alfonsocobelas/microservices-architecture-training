
import { ENGINE_CONSTRAINTS as LIMITS } from '../../../../../src/modules/engines/domain/engine-constants'
import { EngineSerialNumber } from '../../../../../src/modules/engines/domain/value-objects/engine-serial-number.vo'
import { StringMother } from '@libs/testing'

export class EngineSerialNumberMother {
  static create(value: string): EngineSerialNumber {
    return EngineSerialNumber.create(value)
  }

  static random(): EngineSerialNumber {
    return this.create(StringMother.random({
      minLength: LIMITS.SERIAL_NUMBER.MIN_LENGTH,
      maxLength: LIMITS.SERIAL_NUMBER.MAX_LENGTH
    }))
  }
}
