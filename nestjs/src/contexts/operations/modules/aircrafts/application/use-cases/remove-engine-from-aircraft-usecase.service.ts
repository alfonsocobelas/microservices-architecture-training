import { Injectable } from '@nestjs/common'
import { EventBus } from 'src/contexts/shared/domain/event-bus/event-bus'
import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { EngineRepository } from 'src/contexts/operations/modules/engines/domain/engine.repository'
import { AircraftRepository } from 'src/contexts/operations/modules/aircrafts/domain/aircraft.repository'
import { EntityNotFoundError } from 'src/contexts/shared/errors'
import { RemoveEngineFromAircraftInput } from '../dtos/remove-engine-from-aircraft-input.dto'

@Injectable()
export class RemoveEngineFromAircraftUsecase {
  constructor(
    private readonly engineRepository: EngineRepository,
    private readonly aircraftRepository: AircraftRepository,
    private readonly eventBus: EventBus
  ) {}

  async invoke(input: RemoveEngineFromAircraftInput): Promise<void> {
    const engineId = EngineId.create(input.engineId)
    const aircraftId = AircraftId.create(input.aircraftId)

    const [engine, aircraft] = await Promise.all([
      this.engineRepository.get(engineId),
      this.aircraftRepository.get(aircraftId)
    ])

    if (!engine) {
      throw new EntityNotFoundError('Engine', input.engineId)
    }

    if (!aircraft) {
      throw new EntityNotFoundError('Aircraft', input.aircraftId)
    }

    aircraft.removeEngine(engineId)
    engine.removeFromAircraft(aircraftId)

    await Promise.all([
      this.aircraftRepository.save(aircraft),
      this.engineRepository.save(engine)
    ])

    await this.eventBus.publish([...aircraft.pullDomainEvents(), ...engine.pullDomainEvents()])
  }
}
