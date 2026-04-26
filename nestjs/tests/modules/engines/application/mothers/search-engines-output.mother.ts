import { SearchEnginesOutput } from 'src/contexts/operations/modules/engines/application/dtos/search-engines-output.dto'
import { CursorPaginatedOutput } from 'src/contexts/shared/application/dtos/search-output.dto'
import { Engine } from 'src/contexts/operations/modules/engines/domain/engine'
import { Nullable } from 'src/contexts/shared/types'

export class SearchEnginesOutputMother {
  static fromDomain(
    items: Engine[],
    hasMore: boolean,
    nextCursor: Nullable<string>
  ): CursorPaginatedOutput<SearchEnginesOutput> {
    return {
      nextCursor,
      hasMore,
      items: items.map(engine => ({
        id: engine.id.value,
        aircraftId: engine.aircraftId?.value,
        isInstalled: engine.isInstalled.value,
        serialNumber: engine.serialNumber.value,
        healthScore: engine.healthScore.value,
        flyingHoursAccumulated: engine.flyingHoursAccumulated.value,
        cyclesSinceLastOverhaul: engine.cyclesSinceLastOverhaul.value,
        status: engine.status.value
      }))
    }
  }

  static empty(): CursorPaginatedOutput<SearchEnginesOutput> {
    return this.fromDomain([], false, null)
  }
}
