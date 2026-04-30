import { Module } from '@nestjs/common'
import { TypeOrmIssueRepository } from '../../../src/modules/issues/infrastructure/persistence/typeorm/typeorm-issue.repository'

@Module({
  providers: [
    TypeOrmIssueRepository
  ],
  exports: [
    TypeOrmIssueRepository
  ]
})
export class TestRepositoriesModule {}
