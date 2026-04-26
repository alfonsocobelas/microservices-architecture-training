import { Injectable } from '@nestjs/common'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { getTotalPages } from 'src/contexts/shared/utils/pagination'
import { OffsetSearchInput } from 'src/contexts/shared/application/dtos/search-input.dto'
import { OffsetPaginatedOutput } from 'src/contexts/shared/application/dtos/search-output.dto'
import { SearchAircraftOutput } from '../dtos/search-aircrafts-output.dtos'
import { AircraftRepository } from '../../domain/aircraft.repository'
import searchAircraftsConfig from '../config/search-aircrafts-config'

@Injectable()
export class SearchAircraftsUseCase {
  constructor(
    private readonly aircraftRepository: AircraftRepository
  ) {}

  async invoke(input: OffsetSearchInput): Promise<OffsetPaginatedOutput<SearchAircraftOutput>> {
    const { allowedFilters, allowedOrders } = searchAircraftsConfig
    const criteria = Criteria.fromOffset(input, allowedFilters, allowedOrders)

    const [aircrafts, total] = await Promise.all([
      this.aircraftRepository.matching(criteria),
      this.aircraftRepository.count(criteria)
    ])

    return {
      total,
      page: input.page,
      pageSize: input.pageSize,
      totalPages: getTotalPages({ pageSize: input.pageSize, total }),
      items: aircrafts.map(aircraft => aircraft.toPrimitives())
    }
  }
}
