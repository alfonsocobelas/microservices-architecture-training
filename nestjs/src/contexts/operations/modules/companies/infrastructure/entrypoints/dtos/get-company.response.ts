import { Expose } from 'class-transformer'

export class GetCompanyResponse {
  @Expose() id!: string
  @Expose() name!: string

  constructor(partial: Partial<GetCompanyResponse>) {
    Object.assign(this, partial)
  }
}
