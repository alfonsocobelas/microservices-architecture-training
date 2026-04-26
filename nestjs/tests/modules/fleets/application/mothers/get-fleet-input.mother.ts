import { v7 as uuidv7 } from 'uuid'
import { GetFleetInput } from 'src/contexts/operations/modules/fleets/application/dtos/get-fleet-input.dto'

export class GetFleetInputMother {
  static create(id: string): GetFleetInput {
    return { id }
  }

  static random(): GetFleetInput {
    const id = uuidv7()
    return this.create(id)
  }
}
