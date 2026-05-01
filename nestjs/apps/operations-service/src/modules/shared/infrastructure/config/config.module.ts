import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import eventBusConfig from '@libs/shared/infrastructure/config/event-bus.config'
import databaseConfig from './database.config'
import appConfig from './app.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig, databaseConfig, eventBusConfig]
    })
  ]
})
export class CoreConfigModule {}
