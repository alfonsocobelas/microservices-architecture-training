import { v7 as uuidv7 } from 'uuid'
import { RemoveEngineFromAircraftInput } from 'src/contexts/operations/modules/aircrafts/application/dtos/remove-engine-from-aircraft-input.dto'

export class RemoveEngineFromAircraftInputMother {
  static create(engineId: string, aircraftId: string): RemoveEngineFromAircraftInput {
    return {
      engineId,
      aircraftId
    }
  }

  static random(): RemoveEngineFromAircraftInput {
    const engineId = uuidv7()
    const aircraftId = uuidv7()
    return this.create(engineId, aircraftId)
  }
}
