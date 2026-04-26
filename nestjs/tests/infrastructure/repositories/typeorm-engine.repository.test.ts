import { TypeOrmEngineRepository } from 'src/contexts/operations/modules/engines/infrastructure/persistence/typeorm/typeorm-engine.repository'
import { EngineMother } from '../../modules/engines/domain/engine.mother'
import { EngineBuilder } from '../../modules/engines/domain/engine.builder'
import { EngineIdMother } from '../../modules/engines/domain/value-objects/engine-id.mother'
import { EngineSerialNumberMother } from '../../modules/engines/domain/value-objects/engine-serial-number'
import { moduleFixture } from '../../jest.setup.integration'
import { EngineStatusMother } from '../../modules/engines/domain/value-objects/engine-status.mother'

let repository: TypeOrmEngineRepository

beforeEach(async () => {
  repository = moduleFixture.get<TypeOrmEngineRepository>(TypeOrmEngineRepository)
})

describe('EngineRepository (integration tests)', () => {
  describe('register method', () => {
    it('should register a new engine', async () => {
      const engine = EngineMother.random()

      await repository.register(engine)
    })
  })

  describe('get method', () => {
    it('should return an engine by its id', async () => {
      const engine = EngineMother.random()

      await repository.register(engine)
      const foundEngine = await repository.get(engine.id)

      expect(foundEngine).toEqual(engine)
    })

    it('should return null if engine does not exist', async () => {
      const nonExistingId = EngineIdMother.random()
      const foundEngine = await repository.get(nonExistingId)

      expect(foundEngine).toBeNull()
    })
  })

  describe('exists method', () => {
    it('should return true if an engine with the given serial number exists', async () => {
      const engine = EngineMother.random()
      await repository.register(engine)

      const exists = await repository.exists(engine.serialNumber)

      expect(exists).toBe(true)
    })

    it('should return false if no engine with the given serial number exists', async () => {
      const nonExistingSerialNumber = EngineSerialNumberMother.random()
      const exists = await repository.exists(nonExistingSerialNumber)

      expect(exists).toBe(false)
    })
  })

  describe('save method', () => {
    it('should update an existing engine', async () => {
      const engine = EngineMother.random()
      await repository.register(engine)

      // Update some properties of the engine
      const updatedHealth = 80
      const updatedEngine = EngineBuilder.anEngine()
        .withId(engine.id.value)
        .withSerialNumber(engine.serialNumber.value)
        .withHealth(updatedHealth)
        .build()

      await repository.save(updatedEngine)

      const foundEngine = await repository.get(engine.id)
      expect(foundEngine).toEqual(updatedEngine)
    })

    it('should save multiple engines at once', async () => {
      const engine1 = EngineMother.random()
      const engine2 = EngineMother.random()

      await repository.register(engine1)
      await repository.register(engine2)

      // Update some properties of the engines
      const updatedHealth1 = 80
      const updatedHealth2 = 90
      const updatedEngine1 = EngineBuilder.anEngine()
        .withId(engine1.id.value)
        .withSerialNumber(engine1.serialNumber.value)
        .withHealth(updatedHealth1)
        .build()

      const updatedEngine2 = EngineBuilder.anEngine()
        .withId(engine2.id.value)
        .withSerialNumber(engine2.serialNumber.value)
        .withHealth(updatedHealth2)
        .build()

      await repository.save([updatedEngine1, updatedEngine2])

      const foundEngine1 = await repository.get(engine1.id)
      const foundEngine2 = await repository.get(engine2.id)

      expect(foundEngine1).toEqual(updatedEngine1)
      expect(foundEngine2).toEqual(updatedEngine2)
    })
  })

  describe('updateStatus method', () => {
    it('should update the status of an existing engine', async () => {
      const engine = EngineMother.random()
      await repository.register(engine)

      const updatedStatus = EngineStatusMother.random()
      await repository.updateStatus(engine.id, updatedStatus)

      const foundEngine = await repository.get(engine.id)
      expect(foundEngine?.status).toEqual(updatedStatus)
    })
  })
})
