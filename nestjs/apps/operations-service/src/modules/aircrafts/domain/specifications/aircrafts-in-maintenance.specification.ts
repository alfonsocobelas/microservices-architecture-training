
import { Filter } from '@libs/shared/domain/query/filter'
import { Filters } from '@libs/shared/domain/query/filters'
import { Criteria } from '@libs/shared/domain/query/criteria'
import { FilterField } from '@libs/shared/domain/query/filter-field'
import { FilterValue } from '@libs/shared/domain/query/filter-value'
import { FilterOperator, Operator } from '@libs/shared/domain/query/filter-operator'
import { AircraftStatusEnum } from '../aircraft-enums'

export class AircraftsInMaintenanceSpecification extends Criteria {
  constructor() {
    super(
      {
        filters: new Filters([
          new Filter(
            new FilterField('status'),
            FilterOperator.create(Operator.EQUAL),
            new FilterValue(AircraftStatusEnum.MAINTENANCE)
          )
        ])
      }
    )
  }

  static inMaintenance(): AircraftsInMaintenanceSpecification {
    return new AircraftsInMaintenanceSpecification()
  }
}

export const inMaintenance = AircraftsInMaintenanceSpecification.inMaintenance
