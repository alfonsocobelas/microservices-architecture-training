/* eslint-disable @typescript-eslint/no-explicit-any */
import { AircraftModelEntity } from 'src/contexts/operations/modules/aircraft-models/infrastructure/persistence/typeorm/typeorm-aircraft-model.entity'
import { AircraftEntity } from 'src/contexts/operations/modules/aircrafts/infrastructure/persistence/typeorm/typeorm-aircraft.entity'
import { CompanyEntity } from 'src/contexts/operations/modules/companies/infrastructure/persistence/typeorm/typeorm-company.entity'
import { EngineEntity } from 'src/contexts/operations/modules/engines/infrastructure/persistence/typeorm/typeorm-engine.entity'
import { FleetEntity } from 'src/contexts/operations/modules/fleets/infrastructure/persistence/typeorm/typeorm-fleet.entity'
import { IssueEntity } from 'src/contexts/maintenance/modules/issues/infrastructure/persistence/typeorm/typeorm-issue.entity'

type EntityConstructor = { new (): any }

export const EntityMapper: Record<string, EntityConstructor> = {
  aircraft_models: AircraftModelEntity,
  aircrafts: AircraftEntity,
  companies: CompanyEntity,
  engines: EngineEntity,
  fleets: FleetEntity,
  issues: IssueEntity
}
