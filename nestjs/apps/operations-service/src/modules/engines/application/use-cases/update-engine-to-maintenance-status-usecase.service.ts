import { Injectable } from '@nestjs/common'
import { EngineId } from '@libs/shared/domain/value-objects/engines/engine-id.vo'
import { EventBus } from '@libs/shared/domain/event-bus/event-bus'
import { EntityNotFoundError } from '@libs/shared/errors'
import { EngineRepository } from '../../domain/engine.repository'
import { UpdateEngineToMaintenanceStatusInput } from '../dtos/update-engine-to-maintenance-status-intput.dto'

@Injectable()
export class UpdateEngineToMaintenanceStatusUseCase {
  constructor(
    private readonly engineRepository: EngineRepository,
    private readonly eventBus: EventBus
  ) {}

  async invoke(input: UpdateEngineToMaintenanceStatusInput): Promise<void> {
    const engineId = EngineId.create(input.id)

    const engine = await this.engineRepository.get(engineId)
    if (!engine) {
      throw new EntityNotFoundError('Engine', engineId.value)
    }

    engine.updateStatusToMaintenance()

    await this.engineRepository.updateStatus(engineId, engine.status)
    await this.eventBus.publish(engine.pullDomainEvents())
  }
}
