import { EntityTarget, In } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Engine } from 'src/contexts/operations/modules/engines/domain/engine'
import { Nullable } from 'src/contexts/shared/types'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { EngineRepository } from 'src/contexts/operations/modules/engines/domain/engine.repository'
import { TypeOrmRepository } from 'src/contexts/shared/infrastructure/persistence/typeorm/typeorm.repository'
import { TypeOrmCriteriaConverter } from 'src/contexts/shared/infrastructure/persistence/typeorm/typeorm-criteria-converter'
import { TypeOrmTransactionManager } from 'src/contexts/shared/infrastructure/persistence/typeorm/typeorm-transaction-manager'
import { EngineMapper } from './typeorm-engine.mapper'
import { EngineEntity } from './typeorm-engine.entity'
import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { EngineSerialNumber } from 'src/contexts/operations/modules/engines/domain/value-objects/engine-serial-number.vo'
import { EngineStatus } from '../../../domain/value-objects/engine-status.vo'

@Injectable()
export class TypeOrmEngineRepository
  extends TypeOrmRepository<EngineEntity>
  implements EngineRepository
{
  constructor(txManager: TypeOrmTransactionManager, converter: TypeOrmCriteriaConverter) {
    super(txManager, converter)
  }

  protected entitySchema(): EntityTarget<EngineEntity> {
    return EngineEntity
  }

  async register(engine: Engine): Promise<void> {
    const repository = this.repository()
    const entity = EngineMapper.toPersistence(engine)

    await repository.insert(entity)
  }

  async save(engines: Engine | Engine[]): Promise<void> {
    const entities = Array.isArray(engines)
      ? engines.map(EngineMapper.toPersistence)
      : EngineMapper.toPersistence(engines)

    await this.persist(entities)
  }

  async get(engineId: EngineId): Promise<Nullable<Engine>> {
    const repository = this.repository()
    const entity = await repository.findOneBy({ id: engineId.value })

    if (!entity) {
      return null
    }

    return EngineMapper.toDomain(entity)
  }

  async find(engineIds: EngineId[]): Promise<Engine[]> {
    const repository = this.repository()
    const ids = engineIds.map(id => id.value)

    const entities = await repository.findBy({ id: In(ids) })

    return entities.map(entity => EngineMapper.toDomain(entity))
  }

  async matching(criteria: Criteria): Promise<Engine[]> {
    const entities = await this.searchByCriteria(criteria)

    return entities.map(entity => EngineMapper.toDomain(entity))
  }

  async exists(serialNumber: EngineSerialNumber): Promise<boolean> {
    const repository = this.repository()

    const existEntity = await repository
      .createQueryBuilder('engine')
      .where('engine.serialNumber = :serialNumber', { serialNumber: serialNumber.value })
      .select('1')
      .getExists()

    return existEntity
  }

  async updateStatus(engineId: EngineId, status: EngineStatus): Promise<void> {
    const repository = this.repository()
    await repository.update({ id: engineId.value }, { status: status.value })
  }
}
