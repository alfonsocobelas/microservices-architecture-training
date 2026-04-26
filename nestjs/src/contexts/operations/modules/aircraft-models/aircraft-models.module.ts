import { Module, forwardRef } from '@nestjs/common'
import { EventBusModule } from 'src/contexts/shared/infrastructure/event-bus/event-bus.module'
import { AircraftsModule } from '../aircrafts/aircrafts.module'
import { GetAircraftModelHandler } from './application/handlers/get-aircraft-model.handler'
import { RemoveAircraftModelHandler } from './application/handlers/remove-aircraft-model.handler'
import { RegisterAircraftModelHandler } from './application/handlers/register-aircraft-model.handler'
import { ListAircraftModelCatalogueHandler } from './application/handlers/list-aircraft-model-catalogue.handler'
import { GetAircraftModelUseCase } from './application/use-cases/get-aircraft-model-usecase.service'
import { RemoveAircraftModelUseCase } from './application/use-cases/remove-aircraft-model-usecase.service'
import { RegisterAircraftModelUseCase } from './application/use-cases/register-aircraft-model-usecase.service'
import { ListAircraftModelCatalogueUseCase } from './application/use-cases/list-aircraft-model-catalogue-usecase.service'
import { AircraftModelRepository } from './domain/aircraft-model.repository'
import { AircraftModelsController } from './infrastructure/entrypoints/aircraft-models.controller'
import { TypeOrmAircraftModelRepository } from './infrastructure/persistence/typeorm/typeorm-aircraft-model.repository'

@Module({
  imports: [
    forwardRef(() => AircraftsModule),
    EventBusModule
  ],
  controllers: [AircraftModelsController],
  providers: [
    // Handlers
    RegisterAircraftModelHandler,
    GetAircraftModelHandler,
    ListAircraftModelCatalogueHandler,
    RemoveAircraftModelHandler,
    // Use Cases
    RegisterAircraftModelUseCase,
    RemoveAircraftModelUseCase,
    GetAircraftModelUseCase,
    ListAircraftModelCatalogueUseCase,
    // Repositories
    {
      provide: AircraftModelRepository,
      useClass: TypeOrmAircraftModelRepository
    }
    // Subscribers
  ],
  exports: [AircraftModelRepository]
})
export class AircraftModelsModule {}
