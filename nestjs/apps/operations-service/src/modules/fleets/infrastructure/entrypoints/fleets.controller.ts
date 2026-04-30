import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { RegisterFleetDto } from './dtos/register-fleet.dto'
import { GetFleetResponse } from './dtos/get-fleet.response'
import { SearchFleetsResponse } from './dtos/search-fleets.response'
import { GetFleetHandler } from '../../application/handlers/get-fleet.handler'
import { SearchFleetsHandler } from '../../application/handlers/search-fleets.handler'
import { RegisterFleetHandler } from '../../application/handlers/register-fleet.handler'
import { ParseUUIDv7Pipe } from '../../../shared/infrastructure/pipes/parse-uuid-v7.pipe'
import { ParseCriteriaPipe } from '../../../shared/infrastructure/pipes/parse-criteria.pipe'
import { PaginateOffsetDto } from '../../../shared/infrastructure/dtos/paginate-offset.dto'

@Controller('fleets')
export class FleetsController {
  constructor(
      private readonly registerFleetHandler: RegisterFleetHandler,
      private readonly getFleetHandler: GetFleetHandler,
      private readonly searchFleetsHandler: SearchFleetsHandler
  ) {}

  @Post()
  register(@Body() body: RegisterFleetDto): Promise<void> {
    return this.registerFleetHandler.handle(body)
  }

  @Get(':id')
  get(@Param('id', ParseUUIDv7Pipe) id: string): Promise<GetFleetResponse> {
    return this.getFleetHandler.handle(id)
  }

  @Get()
  search(@Query(new ParseCriteriaPipe()) query: PaginateOffsetDto): Promise<SearchFleetsResponse> {
    return this.searchFleetsHandler.handle(query)
  }
}
