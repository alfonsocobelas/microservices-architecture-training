import { Module } from '@nestjs/common'
import { EventBusModule } from './infrastructure'

@Module({
  imports: [EventBusModule],
  exports: [EventBusModule]
})
export class SharedModule {}
