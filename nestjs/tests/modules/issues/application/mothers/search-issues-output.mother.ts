import { SearchIssuesOutput } from 'src/contexts/maintenance/modules/issues/application/dtos/search-issues-output.dto'
import { CursorPaginatedOutput } from 'src/contexts/shared/application/dtos/search-output.dto'
import { Issue } from 'src/contexts/maintenance/modules/issues/domain/issue'
import { Nullable } from 'src/contexts/shared/types'

export class SearchIssuesOutputMother {
  static fromDomain(
    items: Issue[],
    hasMore: boolean,
    nextCursor: Nullable<string>
  ): CursorPaginatedOutput<SearchIssuesOutput> {
    return {
      nextCursor,
      hasMore,
      items: items.map(issue => ({
        id: issue.id.value,
        code: issue.code.value,
        description: issue.description.value,
        severity: issue.severity.value,
        requiresGrounding: issue.requiresGrounding.value,
        partCategory: issue.partCategory.value,
        aircraftId: issue.aircraftId?.value,
        engineId: issue.engineId?.value
      }))
    }
  }

  static empty(): CursorPaginatedOutput<SearchIssuesOutput> {
    return this.fromDomain([], false, null)
  }
}
