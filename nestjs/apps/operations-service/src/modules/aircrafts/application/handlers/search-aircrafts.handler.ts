import { Injectable } from '@nestjs/common'
import { SearchAircraftsResponse } from '../../infrastructure/entrypoints/dtos/search-aircrafts.response'
import { SearchAircraftsUseCase } from '../use-cases/search-aircrafts-usecase.service'
import { PaginateOffsetDto } from '../../../shared/infrastructure/dtos/paginate-offset.dto'

@Injectable()
export class SearchAircraftsHandler {
  constructor(
    private readonly useCase: SearchAircraftsUseCase
  ) {}

  async handle(dto: PaginateOffsetDto): Promise<SearchAircraftsResponse> {
    const output = await this.useCase.invoke(dto)

    return new SearchAircraftsResponse(output)
  }
}
