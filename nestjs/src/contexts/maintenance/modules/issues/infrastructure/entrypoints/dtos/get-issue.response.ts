import { Nullable } from 'src/contexts/shared/types'
import { Expose, Transform } from 'class-transformer'

export class GetIssueResponse {
  @Expose() id!: string
  @Expose() code!: string
  @Expose() description!: string
  @Expose() severity!: string
  @Expose() requiresGrounding!: boolean
  @Expose() partCategory!: string
  @Expose() @Transform(({ value }) => value ?? null) aircraftId!: Nullable<string>
  @Expose() @Transform(({ value }) => value ?? null) engineId!: Nullable<string>

  constructor(partial: Partial<GetIssueResponse>) {
    Object.assign(this, partial)
  }
}
