import { Expose } from 'class-transformer'

export class ListAircraftModelCatalogueResponse {
  @Expose() id!: string
  @Expose() code!: string
  @Expose() name!: string
  @Expose() manufacturer!: string
  @Expose() passengerCapacity!: number
  @Expose() numEngines!: number
  @Expose() status?: string

  constructor(partial: Partial<ListAircraftModelCatalogueResponse>) {
    Object.assign(this, partial)
  }
}
