import { Injectable } from '@nestjs/common'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { OffsetSearchInput } from 'src/contexts/shared/application/dtos/search-input.dto'
import { OffsetPaginatedOutput } from 'src/contexts/shared/application/dtos/search-output.dto'
import { SearchFleetOutput } from '../dtos/search-fleets-output.dto'
import { getTotalPages } from 'src/contexts/shared/utils/pagination'
import { FleetRepository } from '../../domain/fleet.repository'
import searchFleetsConfig from '../config/search-fleets-config'

@Injectable()
export class SearchFleetsUseCase {
  constructor(
    private readonly fleetRepository: FleetRepository
  ) {}

  async invoke(input: OffsetSearchInput): Promise<OffsetPaginatedOutput<SearchFleetOutput>> {
    const { allowedFilters, allowedOrders } = searchFleetsConfig
    const criteria = Criteria.fromOffset(input, allowedFilters, allowedOrders)

    const [fleets, total] = await Promise.all([
      this.fleetRepository.matching(criteria),
      this.fleetRepository.count(criteria)
    ])

    return {
      total,
      page: input.page,
      pageSize: input.pageSize,
      totalPages: getTotalPages({ pageSize: input.pageSize, total }),
      items: fleets.map(fleet => fleet.toPrimitives())
    }
  }
}
