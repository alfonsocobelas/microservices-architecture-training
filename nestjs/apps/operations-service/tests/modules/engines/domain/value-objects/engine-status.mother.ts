import { EngineStatus } from 'src/contexts/operations/modules/engines/domain/value-objects/engine-status.vo'
import { EngineStatusEnum } from 'src/contexts/operations/modules/engines/domain/engine-enums'
import { randomEnumValue } from '../../../shared/utils/random-enum'

export class EngineStatusMother {
  static create(value: EngineStatusEnum): EngineStatus {
    return EngineStatus.create(value)
  }

  static random(): EngineStatus {
    return this.create(randomEnumValue(EngineStatusEnum))
  }
}
