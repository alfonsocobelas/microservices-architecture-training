import { EnumValueObject } from 'src/contexts/shared/domain/value-objects/enum-value-object'
import { FleetTypeEnum, FleetTypeValues } from '../fleet-enums'

export class FleetType extends EnumValueObject<FleetTypeEnum> {
  protected static fieldName = 'Fleet type'

  private constructor(value: FleetTypeEnum) {
    super(value, FleetTypeValues)
  }

  static create(value: string): FleetType {
    this.ensureIsValidEnum(value as FleetTypeEnum, FleetTypeValues)
    return new FleetType(value as FleetTypeEnum)
  }

  isCargo(): boolean {
    return this.value === FleetTypeEnum.CARGO
  }

  isPassenger(): boolean {
    return this.value === FleetTypeEnum.PASSENGER
  }

  isMilitary(): boolean {
    return this.value === FleetTypeEnum.MILITARY
  }

  isPrivate(): boolean {
    return this.value === FleetTypeEnum.PRIVATE
  }

  isSpecialized(): boolean {
    return this.value === FleetTypeEnum.SPECIALIZED
  }
}
