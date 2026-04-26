import { Injectable } from '@nestjs/common'
import { PaginateOffsetDto } from 'src/contexts/shared/infrastructure/dtos/paginate-offset.dto'
import { SearchFleetsResponse } from '../../infrastructure/entrypoints/dtos/search-fleets.response'
import { SearchFleetsUseCase } from '../use-cases/search-fleets-usecase.service'

@Injectable()
export class SearchFleetsHandler {
  constructor(
    private readonly useCase: SearchFleetsUseCase
  ) {}

  async handle(dto: PaginateOffsetDto): Promise<SearchFleetsResponse> {
    const output = await this.useCase.invoke(dto)

    return new SearchFleetsResponse(output)
  }
}
