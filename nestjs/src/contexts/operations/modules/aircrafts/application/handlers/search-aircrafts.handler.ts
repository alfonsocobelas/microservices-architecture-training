import { Injectable } from '@nestjs/common'
import { PaginateOffsetDto } from 'src/contexts/shared/infrastructure/dtos/paginate-offset.dto'
import { SearchAircraftsResponse } from '../../infrastructure/entrypoints/dtos/search-aircrafts.response'
import { SearchAircraftsUseCase } from '../use-cases/search-aircrafts-usecase.service'

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
