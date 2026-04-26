import { TypeOrmIssueRepository } from 'src/contexts/maintenance/modules/issues/infrastructure/persistence/typeorm/typeorm-issue.repository'
import { IssueMother } from '../../modules/issues/domain/issue.mother'
import { moduleFixture } from '../../jest.setup.integration'
import { IssueIdMother } from '../../modules/issues/domain/value-objects/issue-id.mother'

let repository: TypeOrmIssueRepository

beforeEach(async () => {
  repository = moduleFixture.get<TypeOrmIssueRepository>(TypeOrmIssueRepository)
})

describe('IssueRepository (integration tests)', () => {
  describe('register method', () => {
    it('should register a new issue', async () => {
      const issue = IssueMother.avionics()

      await repository.register(issue)
    })
  })

  describe('get method', () => {
    it('should return an issue by its id', async () => {
      const issue = IssueMother.avionics()

      await repository.register(issue)
      const foundIssue = await repository.get(issue.id)

      expect(foundIssue).toEqual(issue)
    })

    it('should return null if issue does not exist', async () => {
      const nonExistingId = IssueIdMother.random()
      const foundIssue = await repository.get(nonExistingId)

      expect(foundIssue).toBeNull()
    })
  })

  describe('get method', () => {
    it('should return an issue by its id', async () => {
      const issue = IssueMother.avionics()

      await repository.register(issue)
      const foundIssue = await repository.get(issue.id)

      expect(foundIssue).toEqual(issue)
    })

    it('should return null if issue does not exist', async () => {
      const nonExistingId = IssueIdMother.random()
      const foundIssue = await repository.get(nonExistingId)

      expect(foundIssue).toBeNull()
    })
  })
})
