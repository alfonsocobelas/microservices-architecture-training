import { v7 as uuidv7 } from 'uuid'
import { RemoveAircraftInput } from '../../../../../src/modules/aircrafts/application/dtos/remove-aircraft-input.dto'

export class RemoveAircraftInputMother {
  static create(id: string): RemoveAircraftInput {
    return { id }
  }

  static random() {
    const id = uuidv7()
    return this.create(id)
  }
}
