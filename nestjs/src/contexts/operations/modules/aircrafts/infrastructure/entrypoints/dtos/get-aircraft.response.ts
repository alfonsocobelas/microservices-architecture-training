import { Exclude, Expose, Type } from 'class-transformer'

class AircraftModelResponse {
  @Expose() id!: string
  @Expose() name!: string
  @Expose() numEngines!: number
}

class AircraftEngineResponse {
  @Expose() id!: string
  @Expose() healthScore!: number
}

export class GetAircraftResponse {
  @Expose() id!: string
  @Expose() modelId!: string
  @Exclude() fleetId?: string
  @Exclude() engineIds?: string[]
  @Exclude() isActive!: boolean
  @Expose() tailNumber!: string
  @Expose() totalFlightHours!: number
  @Expose() fuelLevelPercentage!: number
  @Expose() status!: string
  @Expose() model?: AircraftModelResponse
  @Expose() @Type(() => AircraftEngineResponse) engines?: AircraftEngineResponse[]

  constructor(partial: Partial<GetAircraftResponse>) {
    Object.assign(this, partial)
  }
}
