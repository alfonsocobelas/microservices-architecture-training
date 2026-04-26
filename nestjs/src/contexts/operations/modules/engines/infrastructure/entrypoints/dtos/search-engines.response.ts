import { Expose, Type } from 'class-transformer'
import { Nullable } from 'src/contexts/shared/types'

class EngineResponse {
  @Expose() id!: string
  @Expose() serialNumber!: string
  @Expose() healthScore!: number
  @Expose() flyingHoursAccumulated!: number
  @Expose() cyclesSinceLastOverhaul!: number
  @Expose() status!: string
}

export class SearchEnginesResponse {
  @Expose() hasMore!: boolean
  @Expose() nextCursor!: Nullable<string>
  @Expose() @Type(() => EngineResponse) items!: EngineResponse[]

  constructor(partial: Partial<SearchEnginesResponse>) {
    Object.assign(this, partial)
  }
}
