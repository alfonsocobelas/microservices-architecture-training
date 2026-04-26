import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { ParseUUIDv7Pipe } from 'src/contexts/shared/infrastructure/pipes/parse-uuid-v7.pipe'
import { RegisterAircraftModelDto } from './dtos/register-aircraft-model.dto'
import { GetAircraftModelResponse } from './dtos/get-aircraft-model.response'
import { ListAircraftModelCatalogueResponse } from './dtos/list-aircraft-model-catalogue.response'
import { GetAircraftModelHandler } from '../../application/handlers/get-aircraft-model.handler'
import { RemoveAircraftModelHandler } from '../../application/handlers/remove-aircraft-model.handler'
import { RegisterAircraftModelHandler } from '../../application/handlers/register-aircraft-model.handler'
import { ListAircraftModelCatalogueHandler } from '../../application/handlers/list-aircraft-model-catalogue.handler'

@Controller('aircraft-models')
export class AircraftModelsController {
  constructor(
    private readonly registerAircraftModelHandler: RegisterAircraftModelHandler,
    private readonly listAircraftModelCatalogueHandler: ListAircraftModelCatalogueHandler,
    private readonly getAircraftModelHandler: GetAircraftModelHandler,
    private readonly removeAircraftModelHandler: RemoveAircraftModelHandler
  ) {}

  @Post()
  register(@Body() body: RegisterAircraftModelDto): Promise<void> {
    return this.registerAircraftModelHandler.handle(body)
  }

  @Get('catalogue')
  listCatalogue(): Promise<ListAircraftModelCatalogueResponse[]> {
    return this.listAircraftModelCatalogueHandler.handle()
  }

  @Get(':id')
  get(@Param('id', ParseUUIDv7Pipe) id: string): Promise<GetAircraftModelResponse> {
    return this.getAircraftModelHandler.handle(id)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDv7Pipe) id: string): Promise<void> {
    return this.removeAircraftModelHandler.handle(id)
  }
}
