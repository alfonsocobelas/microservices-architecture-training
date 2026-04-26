import { Nullable } from 'src/contexts/shared/types'
import { Expose, Type } from 'class-transformer'

class IssueItem {
  @Expose() id!: string
  @Expose() code!: string
  @Expose() description!: string
  @Expose() severity!: string
  @Expose() requiresGrounding!: boolean
  @Expose() partCategory!: string
  @Expose() aircraftId?: string
  @Expose() engineId?: string
}
export class SearchIssuesResponse {
  @Expose() hasMore!: boolean
  @Expose() nextCursor!: Nullable<string>
  @Expose() @Type(() => IssueItem) items!: IssueItem[]

  constructor(partial: Partial<SearchIssuesResponse>) {
    Object.assign(this, partial)
  }
}
