import { Injectable } from '@nestjs/common'
import { EventBus } from 'src/contexts/shared/domain/event-bus/event-bus'
import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { EngineRepository } from 'src/contexts/operations/modules/engines/domain/engine.repository'
import { AircraftRepository } from 'src/contexts/operations/modules/aircrafts/domain/aircraft.repository'
import { TransactionManager } from 'src/contexts/shared/domain/persistence/transaction-manager'
import { EntityNotFoundError } from 'src/contexts/shared/errors'
import { AircraftModelRepository } from 'src/contexts/operations/modules/aircraft-models/domain/aircraft-model.repository'
import { InstallEngineInAircraftInput } from '../dtos/install-engine-in-aircraft-input.dto'

@Injectable()
export class InstallEngineInAircraftUsecase {
  constructor(
    private readonly engineRepository: EngineRepository,
    private readonly aircraftRepository: AircraftRepository,
    private readonly aircraftModelRepository: AircraftModelRepository,
    private readonly txManager: TransactionManager,
    private readonly eventBus: EventBus
  ) {}

  async invoke(input: InstallEngineInAircraftInput): Promise<void> {
    const engineId = EngineId.create(input.engineId)
    const aircraftId = AircraftId.create(input.aircraftId)

    const [engine, aircraft] = await Promise.all([
      this.engineRepository.get(engineId),
      this.aircraftRepository.get(aircraftId)
    ])

    if (!engine) {
      throw new EntityNotFoundError('Engine', engineId.value)
    }

    if (!aircraft) {
      throw new EntityNotFoundError('Aircraft', aircraftId.value)
    }

    const model = await this.aircraftModelRepository.get(aircraft.modelId)
    if (!model) {
      throw new EntityNotFoundError('AircraftModel', aircraft.modelId.value)
    }

    aircraft.installEngine(engine.id, model.numEngines)
    engine.installInAircraft(aircraft.id)

    await this.txManager.runInTransaction(async () => {
      await this.aircraftRepository.save(aircraft)
      await this.engineRepository.save(engine)
    })

    await this.eventBus.publish([...aircraft.pullDomainEvents(), ...engine.pullDomainEvents()])
  }
}
