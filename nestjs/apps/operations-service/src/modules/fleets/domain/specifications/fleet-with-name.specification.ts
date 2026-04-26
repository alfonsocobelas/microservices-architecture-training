import { Criteria } from '@libs/shared/domain/query/criteria'
import { Filter } from '@libs/shared/domain/query/filter'
import { FilterField } from '@libs/shared/domain/query/filter-field'
import { FilterOperator, Operator } from '@libs/shared/domain/query/filter-operator'
import { FilterValue } from '@libs/shared/domain/query/filter-value'
import { Filters } from '@libs/shared/domain/query/filters'
import { FleetName } from '../value-objects/fleet-name.vo'

export class FleetWithNameSpecification extends Criteria {
  constructor(name: FleetName) {
    super({
      filters: new Filters([
        new Filter(
          new FilterField('name'),
          FilterOperator.create(Operator.EQUAL),
          new FilterValue(name.value)
        )
      ])
    })
  }

  // todo: que es mejor obligar a que pasen un vo o un primitivo
  static withName(name: FleetName): FleetWithNameSpecification {
    return new FleetWithNameSpecification(name)
  }
}

export const withName = FleetWithNameSpecification.withName
