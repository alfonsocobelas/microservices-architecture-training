import { Expose } from 'class-transformer'

export class GetAircraftModelResponse {
  @Expose() id!: string
  @Expose() name!: string
  @Expose() code!: string
  @Expose() manufacturer!: string
  @Expose() passengerCapacity!: number
  @Expose() numEngines!: number
  @Expose() status!: string

  constructor(partial: Partial<GetAircraftModelResponse>) {
    Object.assign(this, partial)
  }
}
