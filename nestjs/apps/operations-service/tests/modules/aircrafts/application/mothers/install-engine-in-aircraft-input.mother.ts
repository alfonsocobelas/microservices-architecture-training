import { v7 as uuidv7 } from 'uuid'
import { InstallEngineInAircraftInput } from '../../../../../src/modules/aircrafts/application/dtos/install-engine-in-aircraft-input.dto'

export class InstallEngineInAircraftInputMother {
  static create(engineId: string, aircraftId: string): InstallEngineInAircraftInput {
    return {
      engineId,
      aircraftId
    }
  }

  static random(): InstallEngineInAircraftInput {
    const engineId = uuidv7()
    const aircraftId = uuidv7()
    return this.create(engineId, aircraftId)
  }
}
