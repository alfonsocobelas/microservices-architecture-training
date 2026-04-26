import { Expose, Transform } from 'class-transformer'
import { Nullable } from 'src/contexts/shared/types'

export class GetEngineResponse {
  @Expose() id!: string
  @Expose() healthScore!: number
  @Expose() serialNumber!: string
  @Expose() flyingHoursAccumulated!: number
  @Expose() cyclesSinceLastOverhaul!: number
  @Expose() isInstalled!: boolean
  @Expose() status!: string
  @Expose() @Transform(({ value }) => value ?? null) aircraftId!: Nullable<string>

  constructor(partial: Partial<GetEngineResponse>) {
    Object.assign(this, partial)
  }
}
