import { Injectable } from '@nestjs/common'
import { EventBus } from 'src/contexts/shared/domain/event-bus/event-bus'
import { AlreadyExistsError } from 'src/contexts/shared/errors'
import { RegisterEngineInput } from '../dtos/register-engine-input.dto'
import { Engine } from '../../domain/engine'
import { EngineRepository } from '../../domain/engine.repository'
import { EngineInputMapper } from '../../domain/engine-factory'

@Injectable()
export class RegisterEngineUseCase {
  constructor(
    private readonly engineRepository: EngineRepository,
    private readonly eventBus: EventBus
  ) {}

  async invoke(input: RegisterEngineInput): Promise<void> {
    const props = EngineInputMapper.toDomain(input)

    const engineExists = await this.engineRepository.exists(props.serialNumber)
    if (engineExists) {
      throw new AlreadyExistsError('Engine', 'serialNumber', props.serialNumber.value)
    }

    const engine = Engine.create(props)

    await this.engineRepository.register(engine)
    await this.eventBus.publish(engine.pullDomainEvents())
  }
}
