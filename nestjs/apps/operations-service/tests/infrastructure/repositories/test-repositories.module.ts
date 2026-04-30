import { Module } from '@nestjs/common'
import { TypeOrmAircraftModelRepository } from '../../../src/modules/aircraft-models/infrastructure/persistence/typeorm/typeorm-aircraft-model.repository'
import { TypeOrmAircraftRepository } from '../../../src/modules/aircrafts/infrastructure/persistence/typeorm/typeorm-aircraft.repository'
import { TypeOrmCompanyRepository } from '../../../src/modules/companies/infrastructure/persistence/typeorm/typeorm-company.repository'
import { TypeOrmEngineRepository } from '../../../src/modules/engines/infrastructure/persistence/typeorm/typeorm-engine.repository'
import { TypeOrmFleetRepository } from '../../../src/modules/fleets/infrastructure/persistence/typeorm/typeorm-fleet.repository'

@Module({
  providers: [
    TypeOrmAircraftModelRepository,
    TypeOrmAircraftRepository,
    TypeOrmCompanyRepository,
    TypeOrmEngineRepository,
    TypeOrmFleetRepository
  ],
  exports: [
    TypeOrmAircraftModelRepository,
    TypeOrmAircraftRepository,
    TypeOrmCompanyRepository,
    TypeOrmEngineRepository,
    TypeOrmFleetRepository
  ]
})
export class TestRepositoriesModule {}
