import { Module } from '@nestjs/common'
import { EventBusModule } from '@libs/shared'
import { FleetsModule } from './modules/fleets/fleets.module'
import { EnginesModule } from './modules/engines/engines.module'
import { AircraftsModule } from './modules/aircrafts/aircrafts.module'
import { CompaniesModule } from './modules/companies/companies.module'
import { CoreConfigModule } from './modules/shared/infrastructure/config/config.module'
import { PersistenceModule } from './modules/shared/infrastructure/persistence/persistence.module'
import { AircraftModelsModule } from './modules/aircraft-models/aircraft-models.module'

@Module({
  imports: [
    // infrastructure
    CoreConfigModule,
    PersistenceModule,
    EventBusModule,
    // modules
    AircraftModelsModule,
    AircraftsModule,
    CompaniesModule,
    EnginesModule,
    FleetsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
