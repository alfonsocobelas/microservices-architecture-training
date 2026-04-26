import { Injectable } from '@nestjs/common'
import { PaginateCursorDto } from '@libs/shared/infrastructure/dtos/paginate-cursor.dto'
import { SearchIssuesResponse } from '../../infrastructure/entrypoints/dtos/search-issues.response'
import { SearchIssuesUseCase } from '../use-cases/search-issues-usecase.service'

@Injectable()
export class SearchIssuesHandler {
  constructor(
    private readonly useCase: SearchIssuesUseCase
  ) {}

  async handle(dto: PaginateCursorDto): Promise<SearchIssuesResponse> {
    const output = await this.useCase.invoke(dto)

    return new SearchIssuesResponse(output)
  }
}
