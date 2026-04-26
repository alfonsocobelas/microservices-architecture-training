/* eslint-disable @typescript-eslint/no-explicit-any */
import { AircraftModelId } from './value-objects/aircraft-model-id.vo'
import { AircraftModelCode } from './value-objects/aircraft-model-code.vo'
import { AircraftModelName } from './value-objects/aircraft-model-name.vo'
import { AircraftModelStatus } from './value-objects/aircraft-model-status.vo'
import { AircraftModelNumEngines } from './value-objects/aircraft-model-num-engines.vo'
import { AircraftModelManufacturer } from './value-objects/aircraft-model-manufacturer.vo'
import { AircraftModelPassengerCapacity } from './value-objects/aircraft-model-passenger-capacity.vo'
import { AircraftModelPrimitiveProps } from './aircraft-model-types'

type PrimitiveToAggregateMap = {
  id: AircraftModelId
  name: AircraftModelName
  code: AircraftModelCode
  manufacturer: AircraftModelManufacturer
  passengerCapacity: AircraftModelPassengerCapacity
  numEngines: AircraftModelNumEngines
  status: AircraftModelStatus
}

type MapPrimitiveToAggregate<T extends Partial<AircraftModelPrimitiveProps>> = {
  [K in keyof T]: K extends keyof PrimitiveToAggregateMap ? PrimitiveToAggregateMap[K] : never
}

export class AircraftModelInputMapper {
  static toDomain<T extends Partial<AircraftModelPrimitiveProps>>(
    input: T
  ): MapPrimitiveToAggregate<T> {
    const result: any = {}

    if ('id' in input && input.id !== undefined) {
      result.id = AircraftModelId.create(input.id)
    }

    if ('name' in input && input.name !== undefined) {
      result.name = AircraftModelName.create(input.name)
    }

    if ('code' in input && input.code !== undefined) {
      result.code = AircraftModelCode.create(input.code)
    }

    if ('manufacturer' in input && input.manufacturer !== undefined) {
      result.manufacturer = AircraftModelManufacturer.create(input.manufacturer)
    }

    if ('passengerCapacity' in input && input.passengerCapacity !== undefined) {
      result.passengerCapacity = AircraftModelPassengerCapacity.create(input.passengerCapacity)
    }

    if ('numEngines' in input && input.numEngines !== undefined) {
      result.numEngines = AircraftModelNumEngines.create(input.numEngines)
    }

    if ('status' in input && input.status !== undefined) {
      result.status = AircraftModelStatus.create(input.status)
    }

    return result
  }
}
