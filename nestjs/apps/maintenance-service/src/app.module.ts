import { Module } from '@nestjs/common'
import { EventBusModule } from '@libs/shared'
import { IssuesModule } from './modules/issues/issues.module'
import { CoreConfigModule } from './modules/shared/infrastructure/config/config.module'
import { PersistenceModule } from './modules/shared/infrastructure/persistence/persistence.module'

@Module({
  imports: [
    // infrastructure
    CoreConfigModule,
    PersistenceModule,
    EventBusModule,
    // modules
    IssuesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
