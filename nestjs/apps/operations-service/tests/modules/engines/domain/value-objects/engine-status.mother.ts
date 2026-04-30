import { randomEnumValue } from '@libs/testing'
import { EngineStatusEnum } from '../../../../../src/modules/engines/domain/engine-enums'
import { EngineStatus } from '../../../../../src/modules/engines/domain/value-objects/engine-status.vo'

export class EngineStatusMother {
  static create(value: EngineStatusEnum): EngineStatus {
    return EngineStatus.create(value)
  }

  static random(): EngineStatus {
    return this.create(randomEnumValue(EngineStatusEnum))
  }
}
