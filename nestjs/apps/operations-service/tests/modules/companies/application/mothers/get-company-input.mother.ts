import { v7 as uuidv7 } from 'uuid'
import { GetCompanyInput } from 'src/contexts/operations/modules/companies/application/dtos/get-company-input.dto'

export class GetCompanyInputMother {
  static create(id: string): GetCompanyInput {
    return { id }
  }

  static random(): GetCompanyInput {
    const id = uuidv7()
    return this.create(id)
  }
}
