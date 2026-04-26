import { v7 as uuidv7 } from 'uuid'
import { RetireAircraftFromFleetInput } from 'src/contexts/operations/modules/fleets/application/dtos/retire-aircraft-from-fleet-input'

export class RetireAircraftFromFleetInputMother {
  static create(fleetId: string, aircraftId: string): RetireAircraftFromFleetInput {
    return { fleetId, aircraftId }
  }

  static random(): RetireAircraftFromFleetInput {
    const fleetId = uuidv7()
    const aircraftId = uuidv7()
    return this.create(fleetId, aircraftId)
  }
}
