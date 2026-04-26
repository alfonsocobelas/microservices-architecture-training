import { v7 as uuidv7 } from 'uuid'
import { Fleet } from 'src/contexts/operations/modules/fleets/domain/fleet'
import { FleetId } from 'src/contexts/operations/modules/fleets/domain/value-objects/fleet-id.vo'
import { CompanyId } from 'src/contexts/shared/domain/value-objects/companies/company-id.vo'
import { FleetName } from 'src/contexts/operations/modules/fleets/domain/value-objects/fleet-name.vo'
import { FleetType } from 'src/contexts/operations/modules/fleets/domain/value-objects/fleet-type.vo'
import { FleetAircraftIds } from 'src/contexts/operations/modules/fleets/domain/value-objects/fleet-aircraftIds.vo'
import { FleetPrimitiveProps } from 'src/contexts/operations/modules/fleets/domain/fleet-types'
import { FleetMaintenanceBudget } from 'src/contexts/operations/modules/fleets/domain/value-objects/fleet-maintenance-budget.vo'
import { FleetFleetOperationRegion } from 'src/contexts/operations/modules/fleets/domain/value-objects/fleet-operation-region.vo'
import { FleetStatusEnum, FleetTypeEnum, FleetOperationRegionEnum } from 'src/contexts/operations/modules/fleets/domain/fleet-enums'
import { FLEET_CONSTRAINTS as LIMITS } from 'src/contexts/operations/modules/fleets/domain/fleet-constants'
import { randomEnumValue } from '../../shared/utils/random-enum'
import { randomString } from '../../shared/utils/random-string'
import { randomNumber } from '../../shared/utils/random-number'

/**
 * IMPORTANT: In integration tests, be careful with fields that have uniqueness constraints.
 * You must set them manually to avoid collisions with other objects created in the database
 *  during test execution.
 */
export class FleetBuilder {
  private props: FleetPrimitiveProps = {
    id: uuidv7(),
    companyId: uuidv7(),
    aircraftIds: [uuidv7(), uuidv7()],
    name: randomString(LIMITS.NAME.MIN_LENGTH, LIMITS.NAME.MAX_LENGTH),
    maintenanceBudget: randomNumber(LIMITS.MAINTENANCE_BUDGET.MIN, LIMITS.MAINTENANCE_BUDGET.MAX),
    type: randomEnumValue(FleetTypeEnum),
    operationRegion: randomEnumValue(FleetOperationRegionEnum),
    status: FleetStatusEnum.DRAFT
  }

  static aFleet(): FleetBuilder {
    return new FleetBuilder()
  }

  withId(id: string): FleetBuilder {
    this.props.id = id
    return this
  }

  withCompanyId(companyId: string): FleetBuilder {
    this.props.companyId = companyId
    return this
  }

  withAircraftIds(aircraftIds: string[]): FleetBuilder {
    this.props.aircraftIds = aircraftIds
    return this
  }

  withName(name: string): FleetBuilder {
    this.props.name = name
    return this
  }

  withFleetOperationRegion(operationRegion: FleetOperationRegionEnum): FleetBuilder {
    this.props.operationRegion = operationRegion
    return this
  }

  withType(type: FleetTypeEnum): FleetBuilder {
    this.props.type = type
    return this
  }

  withMaintenanceBudget(maintenanceBudget: number): FleetBuilder {
    this.props.maintenanceBudget = maintenanceBudget
    return this
  }

  withStatus(status: FleetStatusEnum): FleetBuilder {
    this.props.status = status
    return this
  }

  withProps(overrides?: Partial<FleetPrimitiveProps>): FleetBuilder {
    this.props = { ...this.props, ...overrides }
    return this
  }

  create(): Fleet {
    return Fleet.create({
      id: FleetId.create(this.props.id),
      companyId: CompanyId.create(this.props.companyId),
      aircraftIds: FleetAircraftIds.create(this.props.aircraftIds),
      name: FleetName.create(this.props.name),
      type: FleetType.create(this.props.type),
      operationRegion: FleetFleetOperationRegion.create(this.props.operationRegion),
      maintenanceBudget: FleetMaintenanceBudget.create(this.props.maintenanceBudget)
    })
  }

  build(): Fleet {
    return Fleet.fromPrimitives(this.props)
  }
}
