import { v7 as uuidv7 } from 'uuid'
import { ENGINE_CONSTRAINTS as LIMITS } from '../../../../../src/modules/engines/domain/engine-constants'
import { RegisterEngineInput } from '../../../../../src/modules/engines/application/dtos/register-engine-input.dto'
import { randomString } from '@libs/testing'

export class RegisterEngineInputMother {
  static create(overrides?: Partial<RegisterEngineInput>): RegisterEngineInput {
    return {
      id: uuidv7(),
      serialNumber: randomString(LIMITS.SERIAL_NUMBER.MIN_LENGTH, LIMITS.SERIAL_NUMBER.MAX_LENGTH).trim().toUpperCase(),
      ...overrides
    }
  }

  static random(): RegisterEngineInput {
    return this.create()
  }

  static withExistingSerialNumber(serialNumber: string): RegisterEngineInput {
    return this.create({ serialNumber })
  }
}
