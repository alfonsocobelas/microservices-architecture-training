import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { EngineAggregateProps } from './engine-types'
import { EngineSerialNumber } from './value-objects/engine-serial-number.vo'
import { RegisterEngineInput } from '../application/dtos/register-engine-input.dto'

export class EngineInputMapper {
  static toDomain(raw: RegisterEngineInput): EngineAggregateProps {
    return {
      id: EngineId.create(raw.id),
      serialNumber: EngineSerialNumber.create(raw.serialNumber)
    }
  }
}
