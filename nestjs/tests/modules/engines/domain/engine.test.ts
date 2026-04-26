import fc from 'fast-check'
import { normalizeString } from 'src/contexts/shared/utils/normalize'
import { EngineBuilder } from './engine.builder'
import { EngineStatusEnum } from 'src/contexts/operations/modules/engines/domain/engine-enums'
import { ENGINE_DEFAULTS as DEFAULT, ENGINE_CONSTRAINTS as LIMITS } from 'src/contexts/operations/modules/engines/domain/engine-constants'
import { EngineMother } from './engine.mother'
import { Engine } from 'src/contexts/operations/modules/engines/domain/engine'
import { AircraftIdMother } from '../../shared/domain/mothers/aircraftId.mother'

describe('Engine domain model (unit/property-based test)', () => {

  describe('Invariants', () => {
    describe('id validation', () => {
      it('should throw error if ID is not UUID v7', () => {
        fc.assert(
          fc.property(fc.uuid({ version: 4 }), (invalidId) => {
            const builder = EngineBuilder.anEngine().withId(invalidId)

            expect(() => builder.create()).toThrow('Engine ID must be a valid UUID v7')
          })
        )
      })
    })

    describe('serial number validation', () => {
      it('should fail if serial number is empty or only whitespace', () => {
        fc.assert(
          fc.property(
            fc.constantFrom('', ' ', '\t', '\n', '\r\n', '   \t\n  '),
            (invalidSn) => {
              const builder = EngineBuilder.anEngine().withSerialNumber(invalidSn)

              expect(() => builder.create()).toThrow('Serial number cannot be empty string')
            }
          )
        )
      })

      it('should fail if serial number is less than 1 characters', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: 0, maxLength: LIMITS.SERIAL_NUMBER.MIN_LENGTH - 1 })
              .filter(str => normalizeString(str).length > 0),
            (shortSn) => {
              const builder = EngineBuilder.anEngine().withSerialNumber(shortSn)

              expect(() => builder.create()).toThrow(`Serial number must be at least ${LIMITS.SERIAL_NUMBER.MIN_LENGTH} characters`)
            }
          )
        )
      })

      it('should fail if serial number is greater than 50 characters', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: LIMITS.SERIAL_NUMBER.MAX_LENGTH + 1 })
              .filter(str => normalizeString(str).length > LIMITS.SERIAL_NUMBER.MAX_LENGTH),
            (longSn) => {
              const builder = EngineBuilder.anEngine().withSerialNumber(longSn)

              expect(() => builder.create()).toThrow(`Serial number must be less than or equal to ${LIMITS.SERIAL_NUMBER.MAX_LENGTH} characters`)
            }
          )
        )
      })
    })
  })

  describe('Business rules', () => {
    describe('on creation', () => {
      it('should create a valid engine with default properties', () => {
        const engine = EngineBuilder.anEngine().create()

        expect(engine).toBeInstanceOf(Engine)
        expect(engine).toHaveProperty('id')
        expect(engine).toHaveProperty('serialNumber')
        expect(engine.isInstalled.value).toBe(false)
        expect(engine.aircraftId?.value).toBeUndefined()
        expect(engine.status.value).toBe(EngineStatusEnum.OPERATIONAL)
        expect(engine.healthScore.value).toBe(LIMITS.HEALTH_SCORE.MAX)
        expect(engine.flyingHoursAccumulated.value).toBe(DEFAULT.FLYING_HOURS)
        expect(engine.cyclesSinceLastOverhaul.value).toBe(DEFAULT.CYCLES_SINCE_LAST_OVERHAUL)
      })

      it('should normalize serial number to uppercase and trim whitespace', () => {
        const engine = EngineBuilder.anEngine().withSerialNumber('  sn-123-abc  ').create()

        expect(engine.serialNumber.value).toBe('SN-123-ABC')
      })
    })

    describe('on installation', () => {
      it('should allow installation only if operational and not installed', () => {
        const engine = EngineMother.operational()
        const aircraftId = AircraftIdMother.random()

        engine.installInAircraft(aircraftId)

        expect(engine.isInstalled.value).toBe(true)
        expect(engine.aircraftId?.value).toBe(aircraftId.value)
      })

      it('should fail to install if already installed', () => {
        const aircraftId = AircraftIdMother.random()
        const engine = EngineMother.installed(aircraftId.value)
        const notFreeAircraftId = AircraftIdMother.random()

        expect(() => engine.installInAircraft(notFreeAircraftId))
          .toThrow(`Engine ${engine.id.value} is already installed on the other aircraft`)
      })

      it('should fail to install if status is not OPERATIONAL', () => {
        const aircraftId = AircraftIdMother.random()
        const engine = EngineMother.damaged()

        expect(() => engine.installInAircraft(aircraftId))
          .toThrow('Only operational engines can be installed')
      })

      it('should not allow installing an engine with health score below 60', () => {
        fc.assert(
          fc.property(
            fc.double({ min: 0, max: LIMITS.HEALTH_SCORE.MIN - 0.1, noNaN: true }),
            (lowHealthScore) => {
              const engine = EngineBuilder
                .anEngine()
                .withStatus(EngineStatusEnum.OPERATIONAL)
                .withIsInstalled(false)
                .withHealth(lowHealthScore)
                .build()

              expect(() => engine.installInAircraft(AircraftIdMother.random())).toThrow(`Engine health score must be at least ${LIMITS.HEALTH_SCORE.MIN} to be installed`)
            }
          )
        )
      })
    })
  })
})
