import { Exclude, Expose, Type } from 'class-transformer'

class FleetItem {
  @Expose() id!: string
  @Expose() name!: string
  @Expose() companyId!: string
  @Expose() type!: string
  @Expose() operationRegion!: string
  @Expose() maintenanceBudget!: number
  @Expose() status!: string
  @Exclude() aircraftIds!: string[]
}

export class SearchFleetsResponse {
  @Expose() total!: number
  @Expose() page!: number
  @Expose() pageSize!: number
  @Expose() totalPages!: number
  @Expose() @Type(() => FleetItem) items!: FleetItem[]

  constructor(partial: Partial<SearchFleetsResponse>) {
    Object.assign(this, partial)
  }
}
