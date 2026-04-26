import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { Filter } from 'src/contexts/shared/domain/query/filter'
import { Filters } from 'src/contexts/shared/domain/query/filters'
import { FilterValue } from 'src/contexts/shared/domain/query/filter-value'
import { FilterField } from 'src/contexts/shared/domain/query/filter-field'
import { FilterOperator, Operator } from 'src/contexts/shared/domain/query/filter-operator'
import { AircraftModelId } from 'src/contexts/operations/modules/aircraft-models/domain/value-objects/aircraft-model-id.vo'

export class AircraftsOfModelSpecification extends Criteria {
  constructor(modelId: AircraftModelId) {
    super({
      filters: new Filters([
        new Filter(
          new FilterField('modelId'),
          FilterOperator.create(Operator.EQUAL),
          new FilterValue(modelId.value)
        )
      ])
    })
  }

  static aircraftsOfModel(modelId: AircraftModelId): AircraftsOfModelSpecification {
    return new AircraftsOfModelSpecification(modelId)
  }
}

export const aircraftsOfModel = AircraftsOfModelSpecification.aircraftsOfModel
