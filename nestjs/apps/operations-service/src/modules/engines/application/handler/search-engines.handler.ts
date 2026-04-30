import { Injectable } from '@nestjs/common'

import { SearchEnginesResponse } from '../../infrastructure/entrypoints/dtos/search-engines.response'
import { SearchEnginesUseCase } from '../use-cases/search-engines-usecase.service'
import { PaginateCursorDto } from '../../../shared/infrastructure/dtos/paginate-cursor.dto'

@Injectable()
export class SearchEnginesHandler {
  constructor(
    private readonly useCase: SearchEnginesUseCase
  ) {}

  async handle(dto: PaginateCursorDto): Promise<SearchEnginesResponse> {
    const output = await this.useCase.invoke(dto)

    return new SearchEnginesResponse(output)
  }
}
