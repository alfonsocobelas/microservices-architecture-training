import { Module } from '@nestjs/common'
import { AircraftsModule } from '../aircrafts/aircrafts.module'
import { AddAircraftToFleetHandler } from './application/handlers/add-aircraft-to-fleet.handler'
import { GetFleetHandler } from './application/handlers/get-fleet.handler'
import { RegisterFleetHandler } from './application/handlers/register-fleet.handler'
import { RetireAircraftFromFleetHandler } from './application/handlers/retire-aircraft-from-fleet.handler'
import { RetireAircraftsFromFleetHandler } from './application/handlers/retire-aircrafts-from-fleet.handler'
import { SearchFleetsHandler } from './application/handlers/search-fleets.handler'
import { AddAircraftToFleetUsecase } from './application/use-cases/add-aircraft-to-fleet-usecase.service'
import { GetFleetUseCase } from './application/use-cases/get-fleet-usecase.service'
import { RegisterFleetUseCase } from './application/use-cases/register-fleet-usecase.service'
import { RetireAircraftFromFleetUsecase } from './application/use-cases/retire-aircraft-from-fleet-usecase.service'
import { RetireAircraftsFromFleetUsecase } from './application/use-cases/retire-aircrafts-from-fleet-usecase.service'
import { SearchFleetsUseCase } from './application/use-cases/search-fleets-usecase.service'
import { FleetRepository } from './domain/fleet.repository'
import { FleetsController } from './infrastructure/entrypoints/fleets.controller'
import { TypeOrmFleetRepository } from './infrastructure/persistence/typeorm/typeorm-fleet.repository'
import { EventBusModule } from 'src/contexts/shared/infrastructure/event-bus/event-bus.module'

@Module({
  imports: [
    AircraftsModule,
    EventBusModule
  ],
  controllers: [FleetsController],
  providers: [
    // Handlers
    RegisterFleetHandler,
    GetFleetHandler,
    AddAircraftToFleetHandler,
    RetireAircraftFromFleetHandler,
    RetireAircraftsFromFleetHandler,
    SearchFleetsHandler,
    // Use Cases
    RegisterFleetUseCase,
    GetFleetUseCase,
    AddAircraftToFleetUsecase,
    RetireAircraftFromFleetUsecase,
    RetireAircraftsFromFleetUsecase,
    SearchFleetsUseCase,
    // Repositories
    {
      provide: FleetRepository,
      useClass: TypeOrmFleetRepository
    }
    // Subscribers
  ],
  exports: [FleetRepository]
})
export class FleetsModule {}
