import { BooleanValueObject } from 'src/contexts/shared/domain/value-objects/boolean-value-object'

export class IssueRequiresGrounding extends BooleanValueObject {
  protected static fieldName = 'IssueRequiresGrounding'

  private constructor(value: boolean) {
    super(value)
  }

  static create(value: boolean): IssueRequiresGrounding {
    return new IssueRequiresGrounding(value)
  }
}
