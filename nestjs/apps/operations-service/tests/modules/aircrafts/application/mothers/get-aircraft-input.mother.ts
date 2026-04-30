import { v7 as uuidv7 } from 'uuid'
import { GetAircraftInput } from '../../../../../src/modules/aircrafts/application/dtos/get-aircraft-input.dto'

export class GetAircraftInputMother {
  static create(id: string): GetAircraftInput {
    return { id }
  }

  static random(): GetAircraftInput {
    const id = uuidv7()
    return this.create(id)
  }
}
