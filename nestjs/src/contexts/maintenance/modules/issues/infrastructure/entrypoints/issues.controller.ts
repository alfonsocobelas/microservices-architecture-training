import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ParseCriteriaPipe } from 'src/contexts/shared/infrastructure/pipes/parse-criteria.pipe'
import { ParseUUIDv7Pipe } from 'src/contexts/shared/infrastructure/pipes/parse-uuid-v7.pipe'
import { PaginateCursorDto } from 'src/contexts/shared/infrastructure/dtos/paginate-cursor.dto'
import { RegisterIssueDto } from './dtos/register-issue.dto'
import { GetIssueResponse } from './dtos/get-issue.response'
import { SearchIssuesResponse } from './dtos/search-issues.response'
import { GetIssueHandler } from '../../application/handlers/get-issue.handler'
import { SearchIssuesHandler } from '../../application/handlers/search-issues.handler'
import { RegisterIssueHandler } from '../../application/handlers/register-issue.handler'

@Controller('issues')
export class IssuesController {
  constructor(
    private readonly registerIssueHandler: RegisterIssueHandler,
    private readonly getIssueHandler: GetIssueHandler,
    private readonly searchIssuesHandler: SearchIssuesHandler
  ) {}

  @Post()
  register(@Body() body: RegisterIssueDto): Promise<void> {
    return this.registerIssueHandler.handle(body)
  }

  @Get()
  search(@Query(new ParseCriteriaPipe()) query: PaginateCursorDto): Promise<SearchIssuesResponse> {
    return this.searchIssuesHandler.handle(query)
  }

  @Get(':id')
  get(@Param('id', ParseUUIDv7Pipe) id: string): Promise<GetIssueResponse> {
    return this.getIssueHandler.handle(id)
  }
}
