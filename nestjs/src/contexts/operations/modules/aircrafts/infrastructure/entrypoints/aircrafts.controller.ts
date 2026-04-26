import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common'
import { ParseUUIDv7Pipe } from 'src/contexts/shared/infrastructure/pipes/parse-uuid-v7.pipe'
import { ParseCriteriaPipe } from 'src/contexts/shared/infrastructure/pipes/parse-criteria.pipe'
import { PaginateOffsetDto } from 'src/contexts/shared/infrastructure/dtos/paginate-offset.dto'
import { RegisterAircraftDto } from './dtos/register-aircraft.dto'
import { GetAircraftResponse } from './dtos/get-aircraft.response'
import { SearchAircraftsResponse } from './dtos/search-aircrafts.response'
import { FindAircraftsInMaintenanceResponse } from './dtos/find-aircrafts-in-maintenance.response'
import { GetAircraftHandler } from '../../application/handlers/get-aircraft.handler'
import { RemoveAircraftHandler } from '../../application/handlers/remove-aircraft.handler'
import { SearchAircraftsHandler } from '../../application/handlers/search-aircrafts.handler'
import { RegisterAircraftHandler } from '../../application/handlers/register-aircraft.handler'
import { InstallEngineInAircraftHandler } from '../../application/handlers/install-engine-in-aircraft.handler'
import { RemoveEngineFromAircraftHandler } from '../../application/handlers/remove-engine-from-aircraft.handler'
import { FindAircraftsInMaintenanceHandler } from '../../application/handlers/find-aircrafts-in-maintenance.handler'

@Controller('aircrafts')
export class AircraftsController {
  constructor(
    private readonly registerAircraftHandler: RegisterAircraftHandler,
    private readonly getAircraftHandler: GetAircraftHandler,
    private readonly findAircraftsInMaintenanceHandler: FindAircraftsInMaintenanceHandler,
    private readonly removeAircraftHandler: RemoveAircraftHandler,
    private readonly installEngineInAircraftHandler: InstallEngineInAircraftHandler,
    private readonly removeEngineFromAircraftHandler: RemoveEngineFromAircraftHandler,
    private readonly searchAircraftsHandler: SearchAircraftsHandler
  ) {}

  @Post()
  register(@Body() body: RegisterAircraftDto): Promise<void> {
    return this.registerAircraftHandler.handle(body)
  }

  @Get('maintenance')
  findInMaintenance(): Promise<FindAircraftsInMaintenanceResponse[]> {
    return this.findAircraftsInMaintenanceHandler.handle()
  }

  @Get()
  search(@Query(new ParseCriteriaPipe()) query: PaginateOffsetDto): Promise<SearchAircraftsResponse> {
    return this.searchAircraftsHandler.handle(query)
  }

  @Get(':id')
  get(@Param('id', ParseUUIDv7Pipe) id: string): Promise<GetAircraftResponse> {
    return this.getAircraftHandler.handle(id)
  }

  @Post(':aircraftId/engines/:engineId/install')
  installEngine(
    @Param('aircraftId', ParseUUIDv7Pipe) aircraftId: string,
    @Param('engineId', ParseUUIDv7Pipe) engineId: string
  ): Promise<void> {
    return this.installEngineInAircraftHandler.handle(aircraftId, engineId)
  }

  @Post(':aircraftId/engines/:engineId/uninstall')
  uninstallEngine(
    @Param('aircraftId', ParseUUIDv7Pipe) aircraftId: string,
    @Param('engineId', ParseUUIDv7Pipe) engineId: string
  ): Promise<void> {
    return this.removeEngineFromAircraftHandler.handle(aircraftId, engineId)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDv7Pipe) id: string): Promise<void> {
    return this.removeAircraftHandler.handle(id)
  }
}
