import { Nullable } from 'src/contexts/shared/types'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { AircraftStatus } from './value-objects/aircraft-status.vo'
import { Aircraft } from './aircraft'

export abstract class AircraftRepository {
  abstract register(aircraft: Aircraft): Promise<void>
  abstract save(aircrafts: Aircraft | Aircraft[]): Promise<void>
  abstract remove(aircraft: Aircraft): Promise<void>
  abstract get(aircraftId: AircraftId): Promise<Nullable<Aircraft>>
  abstract find(aircraftIds: AircraftId[]): Promise<Aircraft[]>
  abstract matching(criteria: Criteria): Promise<Aircraft[]>
  abstract exists(criteria: Criteria): Promise<boolean>
  abstract count(criteria: Criteria): Promise<number>
  abstract updateStatus(aircraftId: AircraftId, status: AircraftStatus): Promise<void>
}
