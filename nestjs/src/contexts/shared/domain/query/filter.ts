import { InvalidArgumentError } from 'src/contexts/shared/errors'
import { FilterOperator } from './filter-operator'
import { FilterField } from './filter-field'
import { FilterValue } from './filter-value'

export class Filter {
  readonly field: FilterField
  readonly operator: FilterOperator
  readonly value: FilterValue

  constructor(field: FilterField, operator: FilterOperator, value: FilterValue) {
    this.field = field
    this.operator = operator
    this.value = value
  }

  static fromValues(value: Map<string, string>): Filter {
    const field = value.get('field')
    const operator = value.get('operator')
    const filterValue = value.get('value')

    if (!field || !operator || !filterValue) {
      throw new InvalidArgumentError('Invalid filter values')
    }

    return new Filter(
      FilterField.create(field),
      FilterOperator.create(operator),
      FilterValue.create(filterValue)
    )
  }
}
