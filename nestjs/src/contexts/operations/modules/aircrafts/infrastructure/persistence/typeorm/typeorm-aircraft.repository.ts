import { EntityTarget, In } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Nullable } from 'src/contexts/shared/types'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { TypeOrmRepository } from 'src/contexts/shared/infrastructure/persistence/typeorm/typeorm.repository'
import { TypeOrmCriteriaConverter } from 'src/contexts/shared/infrastructure/persistence/typeorm/typeorm-criteria-converter'
import { TypeOrmTransactionManager } from 'src/contexts/shared/infrastructure/persistence/typeorm/typeorm-transaction-manager'
import { AircraftEntity } from './typeorm-aircraft.entity'
import { AircraftMapper } from './typeorm-aircraft.mapper'
import { Aircraft } from '../../../domain/aircraft'
import { AircraftRepository } from '../../../domain/aircraft.repository'
import { AircraftStatus } from '../../../domain/value-objects/aircraft-status.vo'

@Injectable()
export class TypeOrmAircraftRepository
  extends TypeOrmRepository<AircraftEntity>
  implements AircraftRepository
{
  constructor(txManager: TypeOrmTransactionManager, converter: TypeOrmCriteriaConverter) {
    super(txManager, converter)
  }

  protected entitySchema(): EntityTarget<AircraftEntity> {
    return AircraftEntity
  }

  async register(aircraft: Aircraft): Promise<void> {
    const repository = this.repository()
    const entity = AircraftMapper.toPersistence(aircraft)

    await repository.insert(entity)
  }

  async save(aircrafts: Aircraft | Aircraft[]): Promise<void> {
    const entities = Array.isArray(aircrafts)
      ? aircrafts.map(AircraftMapper.toPersistence)
      : AircraftMapper.toPersistence(aircrafts)

    await this.persist(entities)
  }

  async remove(aircraft: Aircraft): Promise<void> {
    const repository = this.repository()
    await repository.delete(aircraft.id.value)
  }

  async exists(criteria: Criteria): Promise<boolean> {
    return this.existsByCriteria(criteria)
  }

  async get(aircraftId: AircraftId): Promise<Nullable<Aircraft>> {
    const repository = this.repository()

    const entity = await repository.findOneBy({ id: aircraftId.value })

    if (!entity) {
      return null
    }

    return AircraftMapper.toDomain(entity)
  }

  async find(aircraftIds: AircraftId[]): Promise<Aircraft[]> {
    const repository = this.repository()
    const ids = aircraftIds.map(id => id.value)

    const entities = await repository.findBy({ id: In(ids) })

    return entities.map(entity => AircraftMapper.toDomain(entity))
  }

  async matching(criteria: Criteria): Promise<Aircraft[]> {
    const entities = await this.searchByCriteria(criteria)

    return entities.map(entity => AircraftMapper.toDomain(entity))
  }

  async count(criteria: Criteria): Promise<number> {
    return this.countByCriteria(criteria)
  }

  async updateStatus(aircraftId: AircraftId, status: AircraftStatus): Promise<void> {
    const repository = this.repository()
    await repository.update({ id: aircraftId.value }, { status: status.value })
  }
}
