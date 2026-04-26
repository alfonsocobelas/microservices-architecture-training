import { v7 as uuidv7 } from 'uuid'
import { GetEngineInput } from 'src/contexts/operations/modules/engines/application/dtos/get-engine-input.dto'

export class GetEngineInputMother {
  static create(id: string): GetEngineInput {
    return { id }
  }

  static random(): GetEngineInput {
    const id = uuidv7()
    return this.create(id)
  }
}
