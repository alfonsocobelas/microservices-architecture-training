import { Module } from '@nestjs/common'
import { CoreConfigModule } from './contexts/shared/infrastructure/config/config.module'
import { PersistenceModule } from './contexts/shared/infrastructure/persistence/persistence.module'
import { RateLimitModule } from './contexts/shared/infrastructure/rate-limit/rate-limit.module'
import { EventBusModule } from './contexts/shared/infrastructure/event-bus/event-bus.module'
import { AircraftModelsModule } from './contexts/operations/modules/aircraft-models/aircraft-models.module'
import { AircraftsModule } from './contexts/operations/modules/aircrafts/aircrafts.module'
import { CompaniesModule } from './contexts/operations/modules/companies/companies.module'
import { EnginesModule } from './contexts/operations/modules/engines/engines.module'
import { FleetsModule } from './contexts/operations/modules/fleets/fleets.module'
import { IssuesModule } from './contexts/maintenance/modules/issues/issues.module'

@Module({
  imports: [
    // infrastructure
    CoreConfigModule,
    PersistenceModule,
    RateLimitModule,
    EventBusModule,
    // modules
    AircraftModelsModule,
    AircraftsModule,
    CompaniesModule,
    EnginesModule,
    FleetsModule,
    IssuesModule
  ]
})
export class AppModule {}
