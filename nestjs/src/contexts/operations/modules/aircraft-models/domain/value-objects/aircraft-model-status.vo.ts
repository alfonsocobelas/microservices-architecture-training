import { EnumValueObject } from 'src/contexts/shared/domain/value-objects/enum-value-object'
import { AircraftModelStatusEnum, AircraftModelStatusValues } from '../aircraft-model-enums'

export class AircraftModelStatus extends EnumValueObject<AircraftModelStatusEnum> {
  protected static fieldName = 'Aircraft model status'

  private constructor(value: AircraftModelStatusEnum) {
    super(value, AircraftModelStatusValues)
  }

  static create(value: string): AircraftModelStatus {
    this.ensureIsValidEnum(value as AircraftModelStatusEnum, AircraftModelStatusValues)
    return new AircraftModelStatus(value as AircraftModelStatusEnum)
  }

  static draft(): AircraftModelStatus {
    return new AircraftModelStatus(AircraftModelStatusEnum.DRAFT)
  }

  static operational(): AircraftModelStatus {
    return new AircraftModelStatus(AircraftModelStatusEnum.OPERATIONAL)
  }

  static decommissioned(): AircraftModelStatus {
    return new AircraftModelStatus(AircraftModelStatusEnum.DECOMMISSIONED)
  }

  static withdraw(): AircraftModelStatus {
    return new AircraftModelStatus(AircraftModelStatusEnum.WITHDRAW)
  }

  isDraft(): boolean {
    return this.value === AircraftModelStatusEnum.DRAFT
  }

  isOperational(): boolean {
    return this.value === AircraftModelStatusEnum.OPERATIONAL
  }

  isDecommissioned(): boolean {
    return this.value === AircraftModelStatusEnum.DECOMMISSIONED
  }

  isWithdrawn(): boolean {
    return this.value === AircraftModelStatusEnum.WITHDRAW
  }
}
