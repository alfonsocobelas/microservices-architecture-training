import { EngineSerialNumber } from 'src/contexts/operations/modules/engines/domain/value-objects/engine-serial-number.vo'
import { StringMother } from '../../../shared/domain/mothers/string.mother'
import { ENGINE_CONSTRAINTS as LIMITS } from 'src/contexts/operations/modules/engines/domain/engine-constants'
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
