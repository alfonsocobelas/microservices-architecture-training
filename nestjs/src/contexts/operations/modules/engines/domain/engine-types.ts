import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { EngineSerialNumber } from './value-objects/engine-serial-number.vo'

export type EngineCreateProps = Pick<EnginePrimitiveProps, 'id' | 'serialNumber'>

export interface EnginePrimitiveProps {
  id: string
  serialNumber: string
  healthScore: number
  flyingHoursAccumulated: number
  cyclesSinceLastOverhaul: number
  status: string
  isInstalled: boolean
  aircraftId?: string
}

export interface EngineAggregateProps {
  id: EngineId
  serialNumber: EngineSerialNumber
  // healthScore: EngineHealthScore
  // flyingHoursAccumulated: EngineFlyingHoursAccumulated
  // cyclesSinceLastOverhaul: EngineCyclesSinceLastOverhaul
  // status: EngineStatus
  // isInstalled: EngineIsInstalled
  // aircraftId?: AircraftId
}
