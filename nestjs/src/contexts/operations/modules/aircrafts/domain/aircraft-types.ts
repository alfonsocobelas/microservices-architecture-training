import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { AircraftModelId } from 'src/contexts/operations/modules/aircraft-models/domain/value-objects/aircraft-model-id.vo'
import { AircraftTailNumber } from './value-objects/aircraft-tail-number.vo'

export interface AircraftPrimitiveProps {
  id: string
  fleetId?: string
  modelId: string
  engineIds: string[]
  tailNumber: string
  totalFlightHours: number
  fuelLevelPercentage: number
  isActive: boolean
  status: string
}

export interface AircraftAggregateProps {
  id: AircraftId
  modelId: AircraftModelId
  tailNumber: AircraftTailNumber
}
