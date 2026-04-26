import { Injectable } from '@nestjs/common'
import { PaginateCursorDto } from 'src/contexts/shared/infrastructure/dtos/paginate-cursor.dto'
import { SearchEnginesResponse } from '../../infrastructure/entrypoints/dtos/search-engines.response'
import { SearchEnginesUseCase } from '../use-cases/search-engines-usecase.service'

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
