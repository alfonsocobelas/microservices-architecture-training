import { GetEngineOutput } from 'src/contexts/operations/modules/engines/application/dtos/get-engine-output.dto'
import { Engine } from 'src/contexts/operations/modules/engines/domain/engine'

export class GetEngineOutputMother {
  static fromDomain(engine: Engine): GetEngineOutput {
    return {
      id: engine.id.value,
      healthScore: engine.healthScore.value,
      serialNumber: engine.serialNumber.value,
      flyingHoursAccumulated: engine.flyingHoursAccumulated.value,
      cyclesSinceLastOverhaul: engine.cyclesSinceLastOverhaul.value,
      isInstalled: engine.isInstalled.value,
      status: engine.status.value,
      aircraftId: engine.aircraftId?.value
    }
  }
}
