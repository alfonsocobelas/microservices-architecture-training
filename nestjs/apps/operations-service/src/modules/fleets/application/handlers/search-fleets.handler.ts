import { Injectable } from '@nestjs/common'

import { SearchFleetsResponse } from '../../infrastructure/entrypoints/dtos/search-fleets.response'
import { SearchFleetsUseCase } from '../use-cases/search-fleets-usecase.service'
import { PaginateOffsetDto } from '../../../shared/infrastructure/dtos/paginate-offset.dto'

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
