
import { Filter } from 'src/contexts/shared/domain/query/filter'
import { Filters } from 'src/contexts/shared/domain/query/filters'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { FilterField } from 'src/contexts/shared/domain/query/filter-field'
import { FilterValue } from 'src/contexts/shared/domain/query/filter-value'
import { FilterOperator, Operator } from 'src/contexts/shared/domain/query/filter-operator'
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
