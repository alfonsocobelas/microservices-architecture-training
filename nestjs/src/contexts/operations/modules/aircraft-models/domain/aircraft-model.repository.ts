import { Nullable } from 'src/contexts/shared/types'
import { AircraftModel } from './aircraft-model'
import { AircraftModelId } from './value-objects/aircraft-model-id.vo'
import { AircraftModelCode } from './value-objects/aircraft-model-code.vo'

export abstract class AircraftModelRepository {
  abstract register(aircraftModel: AircraftModel): Promise<void>
  abstract save(aircraftModels: AircraftModel | AircraftModel[]): Promise<void>
  abstract remove(modelId: AircraftModelId): Promise<void>
  abstract get(modelId: AircraftModelId): Promise<Nullable<AircraftModel>>
  abstract exists(code: AircraftModelCode): Promise<boolean>
  abstract listCatalogue(): Promise<AircraftModel[]>
}
