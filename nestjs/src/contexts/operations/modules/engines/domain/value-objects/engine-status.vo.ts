import { EnumValueObject } from 'src/contexts/shared/domain/value-objects/enum-value-object'
import { EngineStatusEnum, EngineStatusValues } from '../engine-enums'

export class EngineStatus extends EnumValueObject<EngineStatusEnum> {
  protected static fieldName = 'Engine status'

  private constructor(value: EngineStatusEnum) {
    super(value, EngineStatusValues)
  }

  static create(value: string): EngineStatus {
    this.ensureIsValidEnum(value as EngineStatusEnum, EngineStatusValues)
    return new EngineStatus(value as EngineStatusEnum)
  }

  static operational(): EngineStatus {
    return new EngineStatus(EngineStatusEnum.OPERATIONAL)
  }

  static maintenance(): EngineStatus {
    return new EngineStatus(EngineStatusEnum.MAINTENANCE)
  }

  isOperational(): boolean {
    return this.value === EngineStatusEnum.OPERATIONAL
  }

  isMaintenance(): boolean {
    return this.value === EngineStatusEnum.MAINTENANCE
  }
}
