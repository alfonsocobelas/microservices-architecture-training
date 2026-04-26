import { TypeOrmAircraftRepository } from 'src/contexts/operations/modules/aircrafts/infrastructure/persistence/typeorm/typeorm-aircraft.repository'
import { AircraftsOfModelSpecification } from 'src/contexts/operations/modules/aircrafts/domain/specifications/aircrafts-of-model.specification'
import { AircraftWithTailNumberSpecification } from 'src/contexts/operations/modules/aircrafts/domain/specifications/aircraft-with-tail-number.specification'
import { AircraftBuilder } from '../../modules/aircrafts/domain/aircraft.builder'
import { AircraftIdMother } from '../../modules/shared/domain/mothers/aircraftId.mother'
import { AircraftStatusMother } from '../../modules/aircrafts/domain/value-objects/aircraft-status.mother'
import { AircraftModelIdMother } from '../../modules/aircraft-models/domain/value-objects/aircraft-model-id.mother'
import { AircraftTailNumberMother } from '../../modules/aircrafts/domain/value-objects/aircraft-tail-number.mother'
import { setupAircraftModel } from './helpers/setup-aircraft-model'
import { moduleFixture } from '../../jest.setup.integration'

let repository: TypeOrmAircraftRepository
let modelId: string

beforeAll(() => {
  repository = moduleFixture.get<TypeOrmAircraftRepository>(TypeOrmAircraftRepository)
})

beforeEach(async () => {
  modelId = await setupAircraftModel()
})

describe('AircraftRepository (integration tests)', () => {
  describe('register method', () => {
    it('should create a new aircraft', async () => {
      const aircraft = AircraftBuilder.anAircraft().withModelId(modelId).build()

      await repository.register(aircraft)
      const foundAircraft = await repository.get(aircraft.id)

      expect(foundAircraft).toEqual(aircraft)
    })
  })

  describe('save method', () => {
    it('should save an existing aircraft', async () => {
      const aircraft = AircraftBuilder.anAircraft().withModelId(modelId).build()
      await repository.register(aircraft)

      // Update some properties of the aircraft
      const updatedFuelLevel = 80
      const updatedFlightHours = 150

      const updatedAircraft = AircraftBuilder.anAircraft()
        .withId(aircraft.id.value)
        .withModelId(modelId)
        .withFuelLevel(updatedFuelLevel)
        .withFlightHours(updatedFlightHours)
        .build()

      await repository.save(updatedAircraft)
      const foundAircraft = await repository.get(aircraft.id)

      expect(foundAircraft).toEqual(updatedAircraft)
    })
  })

  describe('remove method', () => {
    it('should delete an existing aircraft', async () => {
      const aircraft = AircraftBuilder.anAircraft().withModelId(modelId).build()

      await repository.register(aircraft)
      await repository.remove(aircraft)
      const foundAircraft = await repository.get(aircraft.id)

      expect(foundAircraft).toBeNull()
    })
  })

  describe('get method', () => {
    it('should return an aircraft by its id', async () => {
      const aircraft = AircraftBuilder.anAircraft().withModelId(modelId).build()

      await repository.register(aircraft)
      const foundAircraft = await repository.get(aircraft.id)

      expect(foundAircraft).toEqual(aircraft)
    })

    it('should return null if aircraft does not exist', async () => {
      const nonExistingId = AircraftIdMother.random()
      const foundAircraft = await repository.get(nonExistingId)

      expect(foundAircraft).toBeNull()
    })
  })

  describe('exists method', () => {
    it('should return true if an aircraft matching the criteria exists', async () => {
      const aircraft = AircraftBuilder.anAircraft().withModelId(modelId).build()
      await repository.register(aircraft)

      const criteria = new AircraftWithTailNumberSpecification(aircraft.tailNumber)
      const exists = await repository.exists(criteria)

      expect(exists).toBe(true)
    })

    it('should return false if no aircraft matching the criteria exists', async () => {
      const nonExistingTailNumber = AircraftTailNumberMother.random()
      const criteria = new AircraftWithTailNumberSpecification(nonExistingTailNumber)
      const exists = await repository.exists(criteria)

      expect(exists).toBe(false)
    })
  })

  describe('count method', () => {
    it('should return the count of aircraft matching the criteria', async () => {
      const aircraft1 = AircraftBuilder.anAircraft().withModelId(modelId).build()
      const aircraft2 = AircraftBuilder.anAircraft().withModelId(modelId).build()

      await repository.register(aircraft1)
      await repository.register(aircraft2)

      const criteria = new AircraftsOfModelSpecification(AircraftModelIdMother.create(modelId))
      const count = await repository.count(criteria)

      expect(count).toBe(2)
    })

    it('should return 0 if no aircraft matching the criteria exists', async () => {
      const nonExistingModelId = AircraftModelIdMother.random()
      const criteria = new AircraftsOfModelSpecification(nonExistingModelId)
      const count = await repository.count(criteria)

      expect(count).toBe(0)
    })
  })

  describe('matching method', () => {
    it('should return a list of aircraft matching the criteria', async () => {
      const aircraft1 = AircraftBuilder.anAircraft().withModelId(modelId).build()
      const aircraft2 = AircraftBuilder.anAircraft().withModelId(modelId).build()

      await repository.register(aircraft1)
      await repository.register(aircraft2)

      const criteria = new AircraftsOfModelSpecification(AircraftModelIdMother.create(modelId))
      const matchingAircrafts = await repository.matching(criteria)

      expect(matchingAircrafts).toHaveLength(2)
      expect(matchingAircrafts).toEqual(expect.arrayContaining([aircraft1, aircraft2]))
    })

    it('should return an empty list if no aircraft matching the criteria exists', async () => {
      const nonExistingModelId = AircraftModelIdMother.random()
      const criteria = new AircraftsOfModelSpecification(nonExistingModelId)
      const matchingAircrafts = await repository.matching(criteria)

      expect(matchingAircrafts).toHaveLength(0)
    })
  })

  describe('find method', () => {
    it('should return a list of aircraft for the given ids', async () => {
      const aircraft1 = AircraftBuilder.anAircraft().withModelId(modelId).build()
      const aircraft2 = AircraftBuilder.anAircraft().withModelId(modelId).build()

      await repository.register(aircraft1)
      await repository.register(aircraft2)

      const foundAircrafts = await repository.find([aircraft1.id, aircraft2.id])

      expect(foundAircrafts).toHaveLength(2)
      expect(foundAircrafts).toEqual(expect.arrayContaining([aircraft1, aircraft2]))
    })

    it('should return an empty list if no aircraft with the given ids exist', async () => {
      const nonExistingId1 = AircraftIdMother.random()
      const nonExistingId2 = AircraftIdMother.random()

      const foundAircrafts = await repository.find([nonExistingId1, nonExistingId2])

      expect(foundAircrafts).toHaveLength(0)
    })
  })

  describe('updateStatus method', () => {
    it('should update the status of an existing aircraft', async () => {
      const aircraft = AircraftBuilder.anAircraft().withModelId(modelId).build()
      await repository.register(aircraft)

      const updatedStatus = AircraftStatusMother.random()
      await repository.updateStatus(aircraft.id, updatedStatus)

      const foundAircraft = await repository.get(aircraft.id)

      expect(foundAircraft?.status).toEqual(updatedStatus)
    })
  })
})
