import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import databaseConfig from './database.config'
import eventBusConfig from './event-bus.config'
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
