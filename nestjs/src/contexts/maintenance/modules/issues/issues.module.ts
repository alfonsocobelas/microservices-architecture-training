import { Module } from '@nestjs/common'
import { EventBusModule } from 'src/contexts/shared/infrastructure/event-bus/event-bus.module'
import { GetIssueHandler } from './application/handlers/get-issue.handler'
import { RegisterIssueHandler } from './application/handlers/register-issue.handler'
import { SearchIssuesHandler } from './application/handlers/search-issues.handler'
import { GetIssueUseCase } from './application/use-cases/get-issue-usecase.service'
import { RegisterIssueUseCase } from './application/use-cases/register-issue-usecase.service'
import { SearchIssuesUseCase } from './application/use-cases/search-issues-usecase.service'
import { IssueRepository } from './domain/issue.repository'
import { IssuesController } from './infrastructure/entrypoints/issues.controller'
import { TypeOrmIssueRepository } from './infrastructure/persistence/typeorm/typeorm-issue.repository'

@Module({
  imports: [EventBusModule],
  controllers: [IssuesController],
  providers: [
    // Handlers
    RegisterIssueHandler,
    GetIssueHandler,
    SearchIssuesHandler,
    // Use Cases
    RegisterIssueUseCase,
    GetIssueUseCase,
    SearchIssuesUseCase,
    // Repositories
    {
      provide: IssueRepository,
      useClass: TypeOrmIssueRepository
    }
    // Subscribers
  ],
  exports: [IssueRepository]
})
export class IssuesModule {}
