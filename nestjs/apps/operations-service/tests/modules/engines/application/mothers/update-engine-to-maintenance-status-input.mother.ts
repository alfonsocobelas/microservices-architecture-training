import { v7 as uuidv7 } from 'uuid'
import { UpdateEngineToMaintenanceStatusInput } from 'src/contexts/operations/modules/engines/application/dtos/update-engine-to-maintenance-status-intput.dto'

export class UpdateEngineToMaintenanceStatusInputMother {
  static create(id: string): UpdateEngineToMaintenanceStatusInput {
    return { id }
  }

  static random(): UpdateEngineToMaintenanceStatusInput {
    const id = uuidv7()
    return this.create(id)
  }
}
