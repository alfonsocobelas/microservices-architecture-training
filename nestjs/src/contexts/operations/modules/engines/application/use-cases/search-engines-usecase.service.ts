import { Injectable } from '@nestjs/common'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { Cursor } from 'src/contexts/shared/domain/query/cursor'
import { CursorSearchInput } from 'src/contexts/shared/application/dtos/search-input.dto'
import { CursorPaginatedOutput } from 'src/contexts/shared/application/dtos/search-output.dto'
import { SearchEnginesOutput } from '../dtos/search-engines-output.dto'
import { EngineRepository } from '../../domain/engine.repository'
import searchEnginesConfig from '../config/search-engines-config'

@Injectable()
export class SearchEnginesUseCase {
  constructor(
    private readonly engineRepository: EngineRepository
  ) {}

  async invoke(input: CursorSearchInput): Promise<CursorPaginatedOutput<SearchEnginesOutput>> {
    const { allowedFilters, allowedOrders } = searchEnginesConfig
    const criteria = Criteria.fromCursor(input, allowedFilters, allowedOrders)

    const engines = await this.engineRepository.matching(criteria)

    const hasMore = engines.length > input.pageSize
    if (hasMore) {
      engines.pop()
    }

    const lastItem = engines[engines.length - 1]
    if (!lastItem) {
      return {
        nextCursor: null,
        hasMore: false,
        items: []
      }
    }

    const nextCursor = Cursor.encode(lastItem.id.value, criteria.filters, criteria.orders)

    return {
      nextCursor,
      hasMore,
      items: engines.map(engine => engine.toPrimitives())
    }
  }
}
