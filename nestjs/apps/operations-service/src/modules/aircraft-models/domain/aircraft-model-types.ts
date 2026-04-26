import { AircraftModelId } from './value-objects/aircraft-model-id.vo'
import { AircraftModelName } from './value-objects/aircraft-model-name.vo'
import { AircraftModelCode } from './value-objects/aircraft-model-code.vo'
import { AircraftModelNumEngines } from './value-objects/aircraft-model-num-engines.vo'
import { AircraftModelManufacturer } from './value-objects/aircraft-model-manufacturer.vo'
import { AircraftModelPassengerCapacity } from './value-objects/aircraft-model-passenger-capacity.vo'

export interface AircraftModelAggregateProps {
  id: AircraftModelId
  name: AircraftModelName
  code: AircraftModelCode
  manufacturer: AircraftModelManufacturer
  passengerCapacity: AircraftModelPassengerCapacity
  numEngines: AircraftModelNumEngines
}

export interface AircraftModelPrimitiveProps {
  id: string
  name: string
  code: string
  manufacturer: string
  passengerCapacity: number
  numEngines: number
  status: string
}
