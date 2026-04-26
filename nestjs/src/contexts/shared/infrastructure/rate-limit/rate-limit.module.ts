import { Module } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 10,
          ttl: 60
        }
      ]
    })
  ],
  exports: [ThrottlerModule]
})
export class RateLimitModule {}
