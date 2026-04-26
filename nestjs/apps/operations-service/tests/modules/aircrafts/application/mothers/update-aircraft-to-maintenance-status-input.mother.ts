import { v7 as uuidv7 } from 'uuid'
import { UpdateAircraftToMaintenanceStatusInput } from 'src/contexts/operations/modules/aircrafts/application/dtos/update-aircraft-to-maintenance-status-intput.dto'

export class UpdateAircraftToMaintenanceStatusInputMother {
  static create(id: string): UpdateAircraftToMaintenanceStatusInput {
    return { id }
  }

  static random(): UpdateAircraftToMaintenanceStatusInput {
    const id = uuidv7()
    return this.create(id)
  }
}
