import { CompanyId } from 'src/contexts/shared/domain/value-objects/companies/company-id.vo'
import { FleetId } from './value-objects/fleet-id.vo'
import { FleetName } from './value-objects/fleet-name.vo'
import { FleetType } from './value-objects/fleet-type.vo'
import { FleetMaintenanceBudget } from './value-objects/fleet-maintenance-budget.vo'
import { FleetFleetOperationRegion } from './value-objects/fleet-operation-region.vo'
import { FleetAircraftIds } from './value-objects/fleet-aircraftIds.vo'

export interface FleetAggregateProps {
  id: FleetId
  aircraftIds: FleetAircraftIds
  companyId: CompanyId
  name: FleetName
  type: FleetType
  operationRegion: FleetFleetOperationRegion
  maintenanceBudget: FleetMaintenanceBudget
}

export interface FleetPrimitiveProps {
  id: string
  aircraftIds: string[]
  companyId: string
  name: string
  type: string
  operationRegion: string
  maintenanceBudget: number
  status: string
}
