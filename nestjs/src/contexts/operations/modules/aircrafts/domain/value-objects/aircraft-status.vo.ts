import { EnumValueObject } from 'src/contexts/shared/domain/value-objects/enum-value-object'
import { AircraftStatusEnum, AircraftStatusValues } from '../aircraft-enums'

export class AircraftStatus extends EnumValueObject<AircraftStatusEnum> {
  protected static fieldName = 'Aircraft status'

  private constructor(value: AircraftStatusEnum) {
    super(value, AircraftStatusValues)
  }

  static create(value: string): AircraftStatus {
    this.ensureIsValidEnum(value as AircraftStatusEnum, AircraftStatusValues)
    return new AircraftStatus(value as AircraftStatusEnum)
  }

  isActiveOrMaintenance(): boolean {
    return this.value === AircraftStatusEnum.ACTIVE || this.value === AircraftStatusEnum.MAINTENANCE
  }

  isActive(): boolean {
    return this.value === AircraftStatusEnum.ACTIVE
  }

  static draft(): AircraftStatus {
    return new AircraftStatus(AircraftStatusEnum.DRAFT)
  }

  static active(): AircraftStatus {
    return new AircraftStatus(AircraftStatusEnum.ACTIVE)
  }

  static maintenance(): AircraftStatus {
    return new AircraftStatus(AircraftStatusEnum.MAINTENANCE)
  }
}
