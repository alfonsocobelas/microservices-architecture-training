import { Injectable } from '@nestjs/common'
import { RabbitMqConnection } from '@libs/shared/infrastructure/event-bus/rabbitmq/rabbitmq-connection'
import { EventBusEnvironmentArranger } from '../event-bus-environment-arranger'

@Injectable()
export class RabbitMQEnvironmentArranger
  extends EventBusEnvironmentArranger
{
  constructor(private readonly connection: RabbitMqConnection) {
    super()
  }

  async arrange(): Promise<void> {
    await this.purgeQueues()
  }

  async close(): Promise<void> {
    await this.connection.close()
  }

  private async purgeQueues(): Promise<void> {
    const queues = [
      'mooc.aircraft_issue_created_subscriber',
      'retry.mooc.aircraft_issue_created_subscriber',
      'dead_letter.mooc.aircraft_issue_created_subscriber',
      'mooc.engine_issue_created_subscriber',
      'retry.mooc.engine_issue_created_subscriber',
      'dead_letter.mooc.engine_issue_created_subscriber'
    ]

    for (const queue of queues) {
      try {
        await this.connection.purgeQueue(queue)
      } catch (err) {
        if (err instanceof Error && err.message.includes('NOT_FOUND')) {
          continue
        }
        throw err
      }
    }
  }
}
