import { EntityTarget } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Nullable } from 'src/contexts/shared/types'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { CompanyId } from 'src/contexts/shared/domain/value-objects/companies/company-id.vo'
import { CompanyName } from 'src/contexts/operations/modules/companies/domain/value-objects/company-name.vo'
import { TypeOrmRepository } from 'src/contexts/shared/infrastructure/persistence/typeorm/typeorm.repository'
import { TypeOrmCriteriaConverter } from 'src/contexts/shared/infrastructure/persistence/typeorm/typeorm-criteria-converter'
import { TypeOrmTransactionManager } from 'src/contexts/shared/infrastructure/persistence/typeorm/typeorm-transaction-manager'
import { CompanyMapper } from './typeorm-company.mapper'
import { CompanyEntity } from './typeorm-company.entity'
import { Company } from '../../../domain/company'
import { CompanyRepository } from '../../../domain/company.repository'

@Injectable()
export class TypeOrmCompanyRepository
  extends TypeOrmRepository<CompanyEntity>
  implements CompanyRepository
{
  constructor(txManager: TypeOrmTransactionManager, converter: TypeOrmCriteriaConverter) {
    super(txManager, converter)
  }

  protected entitySchema(): EntityTarget<CompanyEntity> {
    return CompanyEntity
  }

  async register(company: Company): Promise<void> {
    const repository = this.repository()
    const entity = CompanyMapper.toPersistence(company)

    await repository.insert(entity)
  }

  async save(companies: Company | Company[]): Promise<void> {
    const entities = Array.isArray(companies)
      ? companies.map(CompanyMapper.toPersistence)
      : CompanyMapper.toPersistence(companies)

    await this.persist(entities)
  }

  async get(companyId: CompanyId): Promise<Nullable<Company>> {
    const repository = this.repository()

    const entity = await repository.findOneBy({ id: companyId.value })

    if (!entity) {
      return null
    }

    return CompanyMapper.toDomain(entity)
  }

  async matching(criteria: Criteria): Promise<Company[]> {
    const entities = await this.searchByCriteria(criteria)

    return entities.map(entity => CompanyMapper.toDomain(entity))
  }

  async remove(companyId: CompanyId): Promise<void> {
    const repository = this.repository()

    await repository.delete({ id: companyId.value })
  }

  async exists(name: CompanyName): Promise<boolean> {
    const repository = this.repository()

    const existEntity = await repository
      .createQueryBuilder('company')
      .where('company.name = :name', { name: name.value })
      .select('1')
      .getExists()

    return existEntity
  }
}
