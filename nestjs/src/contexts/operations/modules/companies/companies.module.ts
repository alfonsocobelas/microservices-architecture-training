import { Module } from '@nestjs/common'
import { EventBusModule } from 'src/contexts/shared/infrastructure/event-bus/event-bus.module'
import { GetCompanyHandler } from './application/handlers/get-company.handler'
import { RemoveCompanyHandler } from './application/handlers/remove-company.handler'
import { RegisterCompanyHandler } from './application/handlers/register-company.handler'
import { GetCompanyUseCase } from './application/use-cases/get-company-usecase.service'
import { RemoveCompanyUseCase } from './application/use-cases/remove-company-usecase.service'
import { RegisterCompanyUseCase } from './application/use-cases/register-company-usecase.service'
import { CompanyRepository } from './domain/company.repository'
import { CompaniesController } from './infrastructure/entrypoints/companies.controller'
import { TypeOrmCompanyRepository } from './infrastructure/persistence/typeorm/typeorm-company.repository'

@Module({
  imports: [EventBusModule],
  controllers: [CompaniesController],
  providers: [
    // Handlers
    RegisterCompanyHandler,
    GetCompanyHandler,
    RemoveCompanyHandler,
    // Use Cases
    RegisterCompanyUseCase,
    GetCompanyUseCase,
    RemoveCompanyUseCase,
    // Repositories
    {
      provide: CompanyRepository,
      useClass: TypeOrmCompanyRepository
    }
  ],
  exports: [CompanyRepository]
})
export class CompaniesModule {}
