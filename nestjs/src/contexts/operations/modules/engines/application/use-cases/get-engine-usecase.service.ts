import { Injectable } from '@nestjs/common'
import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { EntityNotFoundError } from 'src/contexts/shared/errors'
import { EngineRepository } from '../../domain/engine.repository'
import { GetEngineInput } from '../dtos/get-engine-input.dto'
import { GetEngineOutput } from '../dtos/get-engine-output.dto'

@Injectable()
export class GetEngineUseCase {
  constructor(
    private readonly engineRepository: EngineRepository
  ) {}

  async invoke(input: GetEngineInput): Promise<GetEngineOutput> {
    const engineId = EngineId.create(input.id)

    const engine = await this.engineRepository.get(engineId)
    if (!engine) {
      throw new EntityNotFoundError('Engine', engineId.value)
    }

    return engine.toPrimitives()
  }
}
