import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { Filter } from 'src/contexts/shared/domain/query/filter'
import { Filters } from 'src/contexts/shared/domain/query/filters'
import { FilterField } from 'src/contexts/shared/domain/query/filter-field'
import { FilterValue } from 'src/contexts/shared/domain/query/filter-value'
import { FilterOperator, Operator } from 'src/contexts/shared/domain/query/filter-operator'
import { IssueCode } from '../value-objects/issue-code.vo'

export class IssueWithCodeSpecification extends Criteria {
  constructor(public readonly code: IssueCode) {
    super({
      filters: new Filters([
        new Filter(
          new FilterField('code'),
          FilterOperator.create(Operator.EQUAL),
          new FilterValue(code.value)
        )
      ])
    })
  }

  static withCode(code: IssueCode): IssueWithCodeSpecification {
    return new IssueWithCodeSpecification(code)
  }
}

export const withCode = IssueWithCodeSpecification.withCode
