import { Aircraft } from 'src/contexts/operations/modules/aircrafts/domain/aircraft'
import { Nullable } from 'src/contexts/shared/types'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { AircraftRepository } from 'src/contexts/operations/modules/aircrafts/domain/aircraft.repository'
import { MockRepository } from '../../shared/mocks/mock-repository'
import { AircraftStatus } from 'src/contexts/operations/modules/aircrafts/domain/value-objects/aircraft-status.vo'

export class AircraftRepositoryMock
  extends MockRepository<Aircraft>
  implements AircraftRepository
{
  register(aircraft: Aircraft): Promise<void> {
    return this.getMock('register')(aircraft)
  }

  save(aircrafts: Aircraft | Aircraft[]): Promise<void> {
    return this.getMock('save')(aircrafts)
  }

  remove(aircraft: Aircraft): Promise<void> {
    return this.getMock('remove')(aircraft)
  }

  get(aircraftId: AircraftId): Promise<Nullable<Aircraft>> {
    return this.getMock('get')(aircraftId)
  }

  find(aircraftIds: AircraftId[]): Promise<Aircraft[]> {
    return this.getMock('find')(aircraftIds)
  }

  matching(criteria: Criteria): Promise<Aircraft[]> {
    return this.getMock('matching')(criteria)
  }

  count(criteria: Criteria): Promise<number> {
    return this.getMock('count')(criteria)
  }

  exists(criteria: Criteria): Promise<boolean> {
    return this.getMock('exists')(criteria)
  }

  updateStatus(aircraftId: AircraftId, status: AircraftStatus): Promise<void> {
    return this.getMock('updateStatus')(aircraftId, status)
  }

  // helpers
  givenFound(aircraft: Aircraft): void {
    this.setMockResult('get', aircraft)
  }

  givenNotFound(): void {
    this.setMockResult('get', null)
  }

  givenAircraftsFound(aircrafts: Aircraft[]): void {
    this.setMockResult('find', aircrafts)
  }

  givenNoAircraftsFound(): void {
    this.setMockResult('find', [])
  }

  givenMatching(aircrafts: Aircraft[]): void {
    this.setMockResult('matching', aircrafts)
  }

  givenCount(count: number): void {
    this.setMockResult('count', count)
  }

  givenAlreadyExists(): void {
    this.setMockResult('exists', true)
  }

  givenDoesNotExist(): void {
    this.setMockResult('exists', false)
  }

  whenRegisterSuccess(): void {
    this.setMockResult('register', undefined)
  }

  whenSaveSuccess(): void {
    this.setMockResult('save', undefined)
  }

  whenRemoveSuccess(): void {
    this.setMockResult('remove', undefined)
  }

  whenUpdateStatusSuccess(): void {
    this.setMockResult('updateStatus', undefined)
  }
}
