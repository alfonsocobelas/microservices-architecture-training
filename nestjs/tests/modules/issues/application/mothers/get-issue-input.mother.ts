import { GetIssueInput } from 'src/contexts/maintenance/modules/issues/application/dtos/get-issue-input.dto'
import { v7 as uuidv7 } from 'uuid'

export class GetIssueInputMother {
  static create(id: string): GetIssueInput {
    return { id }
  }

  static random() {
    const id = uuidv7()
    return this.create(id)
  }
}
