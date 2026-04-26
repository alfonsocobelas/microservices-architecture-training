import { EnumValueObject } from 'src/contexts/shared/domain/value-objects/enum-value-object'
import { FleetStatusEnum, FleetStatusValues } from '../fleet-enums'

export class FleetStatus extends EnumValueObject<FleetStatusEnum> {
  protected static fieldName = 'Fleet status'

  private constructor(value: FleetStatusEnum) {
    super(value, FleetStatusValues)
  }

  static create(value: string): FleetStatus {
    this.ensureIsValidEnum(value as FleetStatusEnum, FleetStatusValues)
    return new FleetStatus(value as FleetStatusEnum)
  }

  isDraft(): boolean {
    return this.value === FleetStatusEnum.DRAFT
  }

  isRetired(): boolean {
    return this.value === FleetStatusEnum.RETIRED
  }

  static draft(): FleetStatus {
    return new FleetStatus(FleetStatusEnum.DRAFT)
  }

  static retired(): FleetStatus {
    return new FleetStatus(FleetStatusEnum.RETIRED)
  }
}
