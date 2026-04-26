import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { AircraftModelId } from 'src/contexts/operations/modules/aircraft-models/domain/value-objects/aircraft-model-id.vo'
import { AircraftTailNumber } from './value-objects/aircraft-tail-number.vo'
import { AircraftAggregateProps } from './aircraft-types'
import { RegisterAircraftInput } from '../application/dtos/register-aircraft-input.dto'

export class AircraftInputMapper {
  static toDomain(props: RegisterAircraftInput): AircraftAggregateProps {
    return {
      id: AircraftId.create(props.id),
      modelId: AircraftModelId.create(props.modelId),
      tailNumber: AircraftTailNumber.create(props.tailNumber)
    }
  }
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { FleetId } from 'src/modules/fleets/domain/value-objects/fleet-id.vo'
// import { AircraftId } from 'src/modules/shared/domain/value-objects/aircrafts/aircraft-id.vo'
// import { AircraftModelId } from 'src/modules/aircraft-models/domain/value-objects/aircraft-model-id.vo'
// import { AircraftStatus } from './value-objects/aircraft-status.vo'
// import { AircraftIsActive } from './value-objects/aircraft-is-active.vo'
// import { AircraftEngineIds } from './value-objects/aircraft-engineIds.vo'
// import { AircraftTailNumber } from './value-objects/aircraft-tail-number.vo'
// import { AircraftTotalFlightHours } from './value-objects/aircraft-total-flight-hours.vo'
// import { AircraftFuelLevelPercentage } from './value-objects/aircraft-fuel-level-percentage.vo'
// import { AircraftPrimitiveProps } from './aircraft-types'
// import { EngineId } from 'src/modules/shared/domain/value-objects/engines/engine-id.vo'

// type PrimitiveToAggregateMap = {
//   id: AircraftId
//   fleetId: FleetId
//   modelId: AircraftModelId
//   engineIds: AircraftEngineIds
//   engineId: EngineId
//   tailNumber: AircraftTailNumber
//   totalFlightHours: AircraftTotalFlightHours
//   fuelLevelPercentage: AircraftFuelLevelPercentage
//   isActive: AircraftIsActive
//   status: AircraftStatus
// }

// type MapPrimitiveToAggregate<T extends Partial<AircraftPrimitiveProps>> = {
//   [K in keyof T]: K extends keyof PrimitiveToAggregateMap ? PrimitiveToAggregateMap[K] : never
// }
//

// //todo: hay que modificar el tipo T no puede ser un Partial de un AircratPrimitivePropos porque tenemos inputs
// // con propiedades que no perternecen a la entidad Aircraft, como por ejemplo el engineId

// export class AircraftInputMapper {
//   static toDomain<T extends Partial<AircraftPrimitiveProps>>(
//     input: T
//   ): MapPrimitiveToAggregate<T> {
//     const result: any = {}

//     if ('id' in input && input.id !== undefined) {
//       result.id = AircraftId.create(input.id)
//     }

//     if ('modelId' in input && input.modelId !== undefined) {
//       result.modelId = AircraftModelId.create(input.modelId)
//     }

//     if ('tailNumber' in input && input.tailNumber !== undefined) {
//       result.tailNumber = AircraftTailNumber.create(input.tailNumber)
//     }

//     if ('engineIds' in input && input.engineIds !== undefined) {
//       result.engineIds = EngineId.create(input.engineId)
//     }

//     if ('engineIds' in input && input.engineIds !== undefined) {
//       result.engineIds = AircraftEngineIds.create(input.engineIds)
//     }

//     if ('totalFlightHours' in input && input.totalFlightHours !== undefined) {
//       result.totalFlightHours = AircraftTotalFlightHours.create(input.totalFlightHours)
//     }

//     if ('fuelLevelPercentage' in input && input.fuelLevelPercentage !== undefined) {
//       result.fuelLevelPercentage = AircraftFuelLevelPercentage.create(input.fuelLevelPercentage)
//     }

//     if ('isActive' in input && input.isActive !== undefined) {
//       result.isActive = AircraftIsActive.create(input.isActive)
//     }

//     if ('status' in input && input.status !== undefined) {
//       result.status = AircraftStatus.create(input.status)
//     }

//     if ('fleetId' in input && input.fleetId !== undefined) {
//       result.fleetId = FleetId.create(input.fleetId)
//     }

//     return result
//   }
// }
