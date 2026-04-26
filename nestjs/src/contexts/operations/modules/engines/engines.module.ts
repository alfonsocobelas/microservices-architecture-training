import { Module } from '@nestjs/common'
import { EventBusModule } from 'src/contexts/shared/infrastructure/event-bus/event-bus.module'
import { GetEngineHandler } from './application/handler/get-engine.handler'
import { SearchEnginesHandler } from './application/handler/search-engines.handler'
import { RegisterEngineHandler } from './application/handler/register-engine.handler'
import { GetEngineUseCase } from './application/use-cases/get-engine-usecase.service'
import { SearchEnginesUseCase } from './application/use-cases/search-engines-usecase.service'
import { RegisterEngineUseCase } from './application/use-cases/register-engine-usecase.service'
import { UpdateEngineToMaintenanceStatusUseCase } from './application/use-cases/update-engine-to-maintenance-status-usecase.service'
import { EngineIssueCreatedSubscriber } from './application/subscribers/engine-issue-created.subscriber'
import { EngineRepository } from './domain/engine.repository'
import { EnginesController } from './infrastructure/entrypoints/engines.controller'
import { TypeOrmEngineRepository } from './infrastructure/persistence/typeorm/typeorm-engine.repository'

@Module({
  imports: [EventBusModule],
  controllers: [EnginesController],
  providers: [
    // Handlers
    RegisterEngineHandler,
    GetEngineHandler,
    SearchEnginesHandler,
    // Use Cases
    RegisterEngineUseCase,
    GetEngineUseCase,
    SearchEnginesUseCase,
    UpdateEngineToMaintenanceStatusUseCase,
    // Repositories
    {
      provide: EngineRepository,
      useClass: TypeOrmEngineRepository
    },
    // Subscribers
    EngineIssueCreatedSubscriber
  ],
  exports: [EngineRepository]
})
export class EnginesModule {}
