import { EnumValueObject } from 'src/contexts/shared/domain/value-objects/enum-value-object'
import { FleetOperationRegionEnum, FleetFleetOperationRegionValues } from '../fleet-enums'

export class FleetFleetOperationRegion extends EnumValueObject<FleetOperationRegionEnum> {
  protected static fieldName = 'Fleet operation region'

  private constructor(value: FleetOperationRegionEnum) {
    super(value, FleetFleetOperationRegionValues)
  }

  static create(value: string): FleetFleetOperationRegion {
    this.ensureIsValidEnum(value as FleetOperationRegionEnum, FleetFleetOperationRegionValues)
    return new FleetFleetOperationRegion(value as FleetOperationRegionEnum)
  }

  isAmer(): boolean {
    return this.value === FleetOperationRegionEnum.AMER
  }

  isEmea(): boolean {
    return this.value === FleetOperationRegionEnum.EMEA
  }

  isApac(): boolean {
    return this.value === FleetOperationRegionEnum.APAC
  }
}
