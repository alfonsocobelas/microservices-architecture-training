import { SearchAircraftOutput } from '../../../../../src/modules/aircrafts/application/dtos/search-aircrafts-output.dtos'
import { Aircraft } from '../../../../../src/modules/aircrafts/domain/aircraft'
import { OffsetSearchInput } from '../../../../../src/modules/shared/application/dtos/search-input.dto'
import { OffsetPaginatedOutput } from '../../../../../src/modules/shared/application/dtos/search-output.dto'

export class SearchAircraftsOutputMother {
  static fromDomain(
    items: Aircraft[],
    total: number,
    input: OffsetSearchInput
  ): OffsetPaginatedOutput<SearchAircraftOutput> {
    return {
      total,
      page: input.page,
      pageSize: input.pageSize,
      totalPages: Math.ceil(total / input.pageSize),
      items: items.map(aircraft => ({
        id: aircraft.id.value,
        status: aircraft.status.value,
        modelId: aircraft.modelId.value,
        fleetId: aircraft.fleetId?.value,
        isActive: aircraft.isActive.value,
        engineIds: aircraft.engineIds.values,
        tailNumber: aircraft.tailNumber.value,
        totalFlightHours: aircraft.totalFlightHours.value,
        fuelLevelPercentage: aircraft.fuelLevelPercentage.value
      }))
    }
  }

  static empty(input: OffsetSearchInput): OffsetPaginatedOutput<SearchAircraftOutput> {
    return this.fromDomain([], 0, input)
  }
}
