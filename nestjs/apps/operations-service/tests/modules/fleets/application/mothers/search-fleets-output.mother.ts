import { SearchFleetOutput } from '../../../../../src/modules/fleets/application/dtos/search-fleets-output.dto'
import { Fleet } from '../../../../../src/modules/fleets/domain/fleet'
import { OffsetSearchInput } from '../../../../../src/modules/shared/application/dtos/search-input.dto'
import { OffsetPaginatedOutput } from '../../../../../src/modules/shared/application/dtos/search-output.dto'

export class SearchFleetsOutputMother {
  static fromDomain(
    items: Fleet[],
    total: number,
    input: OffsetSearchInput
  ): OffsetPaginatedOutput<SearchFleetOutput> {
    return {
      total,
      page: input.page,
      pageSize: input.pageSize,
      totalPages: Math.ceil(total / input.pageSize),
      items: items.map(fleet => ({
        id: fleet.id.value,
        name: fleet.name.value,
        type: fleet.type.value,
        status: fleet.status.value,
        companyId: fleet.companyId.value,
        aircraftIds: fleet.aircraftIds.values,
        operationRegion: fleet.operationRegion.value,
        maintenanceBudget: fleet.maintenanceBudget.value
      }))
    }
  }
}
