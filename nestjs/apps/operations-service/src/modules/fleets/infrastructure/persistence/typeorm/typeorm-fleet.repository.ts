import { EntityTarget } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Nullable } from '@libs/shared/types'
import { Criteria } from '@libs/shared/domain/query/criteria'
import { TypeOrmRepository } from '@libs/shared/infrastructure/persistence/typeorm/typeorm.repository'
import { TypeOrmCriteriaConverter } from '@libs/shared/infrastructure/persistence/typeorm/typeorm-criteria-converter'
import { TypeOrmTransactionManager } from '@libs/shared/infrastructure/persistence/typeorm/typeorm-transaction-manager'
import { FleetEntity } from './typeorm-fleet.entity'
import { FleetMapper } from './typeorm-fleet.mapper'
import { FleetRepository } from '../../../domain/fleet.repository'
import { Fleet } from '../../../domain/fleet'
import { FleetId } from '../../../domain/value-objects/fleet-id.vo'

@Injectable()
export class TypeOrmFleetRepository
  extends TypeOrmRepository<FleetEntity>
  implements FleetRepository
{
  constructor(txManager: TypeOrmTransactionManager, converter: TypeOrmCriteriaConverter) {
    super(txManager, converter)
  }

  protected entitySchema(): EntityTarget<FleetEntity> {
    return FleetEntity
  }

  async register(fleet: Fleet): Promise<void> {
    const repository = this.repository()
    const entity = FleetMapper.toPersistence(fleet)

    await repository.insert(entity)
  }

  async save(fleets: Fleet | Fleet[]): Promise<void> {
    const entities = Array.isArray(fleets)
      ? fleets.map(FleetMapper.toPersistence)
      : FleetMapper.toPersistence(fleets)

    await this.persist(entities)
  }

  async get(fleetId: FleetId): Promise<Nullable<Fleet>> {
    const repository = this.repository()
    const entity = await repository.findOneBy({ id: fleetId.value })

    if (!entity) {
      return null
    }

    return FleetMapper.toDomain(entity)
  }

  async matching(criteria: Criteria): Promise<Fleet[]> {
    const items = await this.searchByCriteria(criteria)

    return items.map(entity => FleetMapper.toDomain(entity))
  }

  async exists(criteria: Criteria): Promise<boolean> {
    return this.existsByCriteria(criteria)
  }

  async count(criteria: Criteria): Promise<number> {
    return this.countByCriteria(criteria)
  }
}
