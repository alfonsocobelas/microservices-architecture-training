import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ParseCriteriaPipe } from 'src/contexts/shared/infrastructure/pipes/parse-criteria.pipe'
import { ParseUUIDv7Pipe } from 'src/contexts/shared/infrastructure/pipes/parse-uuid-v7.pipe'
import { PaginateCursorDto } from 'src/contexts/shared/infrastructure/dtos/paginate-cursor.dto'
import { RegisterEngineDto } from './dtos/register-engine.dto'
import { GetEngineResponse } from './dtos/get-engine.response'
import { SearchEnginesResponse } from './dtos/search-engines.response'
import { GetEngineHandler } from '../../application/handler/get-engine.handler'
import { SearchEnginesHandler } from '../../application/handler/search-engines.handler'
import { RegisterEngineHandler } from '../../application/handler/register-engine.handler'

@Controller('engines')
export class EnginesController {
  constructor(
    private readonly registerEngineHandler: RegisterEngineHandler,
    private readonly getEngineHandler: GetEngineHandler,
    private readonly searchEnginesHandler: SearchEnginesHandler
  ) {}

  @Post()
  register(@Body() body: RegisterEngineDto): Promise<void> {
    return this.registerEngineHandler.handle(body)
  }

  @Get(':id')
  get(@Param('id', ParseUUIDv7Pipe) id: string): Promise<GetEngineResponse> {
    return this.getEngineHandler.handle(id)
  }

  @Get()
  search(@Query(new ParseCriteriaPipe()) query: PaginateCursorDto): Promise<SearchEnginesResponse> {
    return this.searchEnginesHandler.handle(query)
  }
}
