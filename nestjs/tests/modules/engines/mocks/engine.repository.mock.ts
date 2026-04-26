import { Engine } from 'src/contexts/operations/modules/engines/domain/engine'
import { Nullable } from 'src/contexts/shared/types'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { EngineRepository } from 'src/contexts/operations/modules/engines/domain/engine.repository'
import { EngineSerialNumber } from 'src/contexts/operations/modules/engines/domain/value-objects/engine-serial-number.vo'
import { MockRepository } from '../../shared/mocks/mock-repository'
import { EngineStatus } from 'src/contexts/operations/modules/engines/domain/value-objects/engine-status.vo'

export class EngineRepositoryMock
  extends MockRepository<Engine>
  implements EngineRepository
{
  register(engine: Engine): Promise<void> {
    return this.getMock('register')(engine)
  }

  get(engineId: EngineId): Promise<Nullable<Engine>> {
    return this.getMock('get')(engineId)
  }

  save(engines: Engine | Engine[]): Promise<void> {
    return this.getMock('save')(engines)
  }

  exists(serialNumber: EngineSerialNumber): Promise<boolean> {
    return this.getMock('exists')(serialNumber)
  }

  find(engineIds: EngineId[]): Promise<Engine[]> {
    return this.getMock('find')(engineIds)
  }

  matching(criteria: Criteria): Promise<Engine[]> {
    return this.getMock('matching')(criteria)
  }

  updateStatus(engineId: EngineId, status: EngineStatus): Promise<void> {
    return this.getMock('updateStatus')(engineId, status)
  }

  // Helpers
  givenFound(engine: Engine): void {
    this.setMockResult('get', engine)
  }

  givenNotFound(): void {
    this.setMockResult('get', null)
  }

  givenFoundMany(engines: Engine[]): void {
    this.setMockResult('find', engines)
  }

  givenAlreadyExists(): void {
    this.setMockResult('exists', true)
  }

  givenDoesNotExist(): void {
    this.setMockResult('exists', false)
  }

  givenMatching(engines: Engine[]): void {
    this.setMockResult('matching', engines)
  }

  whenRegisterSuccess(): void {
    this.setMockResult('register', undefined)
  }

  whenSaveSuccess(): void {
    this.setMockResult('save', undefined)
  }

  whenUpdateStatusSuccess(): void {
    this.setMockResult('updateStatus', undefined)
  }
}
