import { v7 as uuidv7 } from 'uuid'
import { GetIssueInput } from '../../../../../src/modules/issues/application/dtos/get-issue-input.dto'

export class GetIssueInputMother {
  static create(id: string): GetIssueInput {
    return { id }
  }

  static random() {
    const id = uuidv7()
    return this.create(id)
  }
}
