import { FleetId } from './value-objects/fleet-id.vo'
import { CompanyId } from 'src/contexts/shared/domain/value-objects/companies/company-id.vo'
import { FleetName } from './value-objects/fleet-name.vo'
import { FleetType } from './value-objects/fleet-type.vo'
import { FleetAircraftIds } from './value-objects/fleet-aircraftIds.vo'
import { FleetAggregateProps } from './fleet-types'
import { FleetMaintenanceBudget } from './value-objects/fleet-maintenance-budget.vo'
import { FleetFleetOperationRegion } from './value-objects/fleet-operation-region.vo'
import { RegisterFleetInput } from '../application/dtos/register-fleet-input.dto'

export class FleetInputMapper {
  static toDomain(input: RegisterFleetInput): FleetAggregateProps {
    return {
      id: FleetId.create(input.id),
      companyId: CompanyId.create(input.companyId),
      name: FleetName.create(input.name),
      type: FleetType.create(input.type),
      operationRegion: FleetFleetOperationRegion.create(input.operationRegion),
      maintenanceBudget: FleetMaintenanceBudget.create(input.maintenanceBudget),
      aircraftIds: FleetAircraftIds.create(input.aircraftIds)
    }
  }
}
