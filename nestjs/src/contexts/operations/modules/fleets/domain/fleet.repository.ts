import { Nullable } from 'src/contexts/shared/types'
import { Criteria } from 'src/contexts/shared/domain/query/criteria'
import { FleetId } from './value-objects/fleet-id.vo'
import { Fleet } from './fleet'

export abstract class FleetRepository {
  abstract register(fleet: Fleet): Promise<void>
  abstract get(fleetId: FleetId): Promise<Nullable<Fleet>>
  abstract save(fleets: Fleet | Fleet[]): Promise<void>
  abstract matching(criteria: Criteria): Promise<Fleet[]>
  abstract exists(criteria: Criteria): Promise<boolean>
  abstract count(criteria: Criteria): Promise<number>
}
