import { Injectable } from '@nestjs/common'
import { Cursor } from 'src/contexts/shared/domain/query/cursor'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { CursorSearchInput } from 'src/contexts/shared/application/dtos/search-input.dto'
import { CursorPaginatedOutput } from 'src/contexts/shared/application/dtos/search-output.dto'
import { SearchIssuesOutput } from '../dtos/search-issues-output.dto'
import { IssueRepository } from '../../domain/issue.repository'
import searchIssuesConfig from '../config/search-issues-config'

@Injectable()
export class SearchIssuesUseCase {
  constructor(
    private readonly issueRepository: IssueRepository
  ) {}

  async invoke(input: CursorSearchInput): Promise<CursorPaginatedOutput<SearchIssuesOutput>> {
    const { allowedFilters, allowedOrders } = searchIssuesConfig

    const criteria = Criteria.fromCursor(input, allowedFilters, allowedOrders)
    const issues = await this.issueRepository.matching(criteria)

    const hasMore = issues.length > input.pageSize
    if (hasMore) {
      issues.pop()
    }

    const lastItem = issues[issues.length - 1]
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
      items: issues.map(issue => issue.toPrimitives())
    }
  }
}
