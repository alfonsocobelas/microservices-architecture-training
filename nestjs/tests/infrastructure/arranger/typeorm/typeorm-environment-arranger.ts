/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataSource, EntityManager, EntityMetadata } from 'typeorm'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { Nullable } from 'src/contexts/shared/types'
import { PersistenceEnvironmentArranger } from '../persistence-environment-arranger'

@Injectable()
export class TypeOrmEnvironmentArranger
  extends PersistenceEnvironmentArranger
  implements OnModuleInit
{
  constructor(private readonly dataSource: DataSource) {
    super()
  }

  async onModuleInit() {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize()
    }

    await this.initialize()
    await this.dataSource.synchronize()
  }

  protected client(): EntityManager {
    return this.dataSource.manager
  }

  protected repository<EntityType>(entity: { new (): EntityType }) {
    return this.client().getRepository(entity)
  }

  async arrange(): Promise<void> {
    await this.cleanDatabase()
  }

  async close(): Promise<void> {
    await this.cleanDatabase()
  }

  async insertOne<T>(entity: { new (): T }, data: Partial<T>): Promise<void> {
    const repository = this.repository(entity)
    await repository.save(data)
  }

  async insertMany<T>(entity: { new (): T }, dataArray: Partial<T>[]): Promise<void> {
    const repository = this.repository(entity)
    await repository.save(dataArray)
  }

  async findOneBy<T>(entity: { new (): T }, query: any): Promise<Nullable<T>> {
    const repository = this.repository(entity)
    return repository.findOneBy(query) as Nullable<T>
  }

  async find<T>(entity: { new (): T }, query: any): Promise<T[]> {
    const repository = this.repository(entity)
    return (repository.findBy(query) as unknown as T[]) || []
  }

  private async cleanDatabase(): Promise<void> {
    const entities = this.entities()
    const tableNames = entities
      .map(e => (e.schema ? `"${e.schema}"."${e.tableName}"` : `"${e.tableName}"`))
      .join(', ')

    if (!tableNames.length) {
      return
    }

    try {
      await this.client().query(`TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE;`)
    } catch (error) {
      throw new Error(`Unable to clean test database: ${error}`)
    }
  }

  private async initialize(): Promise<void> {
    const schemas = this.schemas()

    for (const schema of schemas) {
      await this.client().query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`)
    }
  }

  private entities(): EntityMetadata[] {
    return this.dataSource.entityMetadatas
  }

  private schemas(): string[] {
    const schemas = this.entities()
      .map(e => e.schema)
      .filter((schema): schema is string => !!schema && schema !== 'public')

    return [...new Set(schemas)]
  }
}
