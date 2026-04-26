import { Module } from '@nestjs/common'
import { IssuesModule } from './modules/issues/issues.module'
import { SharedModule } from '@libs/shared'
import { CoreConfigModule } from './modules/shared/infrastructure/config/config.module'
import { PersistenceModule } from './modules/shared/infrastructure/persistence/persistence.module'

@Module({
  imports: [
    // infrastructure
    CoreConfigModule,
    PersistenceModule,
    SharedModule,
    // modules
    IssuesModule
  ],
  controllers: [],
  providers: []
})
export class MaintenanceServiceModule {}
