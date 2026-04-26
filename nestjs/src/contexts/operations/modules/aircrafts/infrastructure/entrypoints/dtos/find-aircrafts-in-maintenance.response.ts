import { Exclude, Expose } from 'class-transformer'

export class FindAircraftsInMaintenanceResponse {
  @Expose() id!: string
  @Expose() modelId!: string
  @Expose() tailNumber!: string
  @Expose() totalFlightHours!: number
  @Expose() fuelLevelPercentage!: number
  @Expose() status!: string
  @Exclude() isActive!: boolean
  @Exclude() fleetId?: string
  @Exclude() engineIds!: string[]

  constructor(partial: Partial<FindAircraftsInMaintenanceResponse>) {
    Object.assign(this, partial)
  }
}
