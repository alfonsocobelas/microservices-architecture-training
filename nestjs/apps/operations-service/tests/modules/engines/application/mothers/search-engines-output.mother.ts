
import { Nullable } from '@libs/shared/types'
import { SearchEnginesOutput } from '../../../../../src/modules/engines/application/dtos/search-engines-output.dto'
import { Engine } from '../../../../../src/modules/engines/domain/engine'
import { CursorPaginatedOutput } from '../../../../../src/modules/shared/application/dtos/search-output.dto'

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
