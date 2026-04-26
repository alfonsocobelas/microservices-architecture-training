import { Filter } from '@libs/shared/domain/query/filter'
import { Filters } from '@libs/shared/domain/query/filters'
import { Criteria } from '@libs/shared/domain/query/criteria'
import { FilterField } from '@libs/shared/domain/query/filter-field'
import { FilterValue } from '@libs/shared/domain/query/filter-value'
import { FilterOperator, Operator } from '@libs/shared/domain/query/filter-operator'
import { AircraftTailNumber } from '../value-objects/aircraft-tail-number.vo'

export class AircraftWithTailNumberSpecification extends Criteria {
  constructor(tailNumber: AircraftTailNumber) {
    super({
      filters: new Filters([
        new Filter(
          new FilterField('tailNumber'),
          FilterOperator.create(Operator.EQUAL),
          new FilterValue(tailNumber.value)
        )
      ])
    })
  }

  static withTailNumber(tailNumber: AircraftTailNumber): AircraftWithTailNumberSpecification {
    return new AircraftWithTailNumberSpecification(tailNumber)
  }
}

export const withTailNumber = AircraftWithTailNumberSpecification.withTailNumber
