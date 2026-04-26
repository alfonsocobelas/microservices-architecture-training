import { Module } from '@nestjs/common'
import { SharedModule } from '@libs/shared'

@Module({
  imports: [
    SharedModule
  ],
  controllers: [],
  providers: []
})
export class OperationsServiceModule {}
