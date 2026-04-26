import { Expose } from 'class-transformer'

export class GetFleetResponse {
  @Expose() id!: string
  @Expose() aircraftIds!: string[]
  @Expose() companyId!: string
  @Expose() name!: string
  @Expose() operationRegion!: string
  @Expose() type!: string
  @Expose() maintenanceBudget!: number
  @Expose() status!: string

  constructor(partial: Partial<GetFleetResponse>) {
    Object.assign(this, partial)
  }
}
