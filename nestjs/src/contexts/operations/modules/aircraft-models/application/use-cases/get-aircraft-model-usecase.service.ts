import { Injectable } from '@nestjs/common'
import { EntityNotFoundError } from 'src/contexts/shared/errors'
import { GetAircraftModelInput } from '../dtos/get-aircraft-model-input.dto'
import { GetAircraftModelOutput } from '../dtos/get-aircraft-model-output.dto'
import { AircraftModelRepository } from '../../domain/aircraft-model.repository'
import { AircraftModelInputMapper } from '../../domain/aircraft-model-factory'

@Injectable()
export class GetAircraftModelUseCase {
  constructor(
    private readonly repository: AircraftModelRepository
  ) {}

  async invoke(input: GetAircraftModelInput): Promise<GetAircraftModelOutput> {
    const { id: modelId } = AircraftModelInputMapper.toDomain(input)

    const model = await this.repository.get(modelId)
    if (!model) {
      throw new EntityNotFoundError('AircraftModel', modelId.value)
    }

    return model.toPrimitives()
  }
}
