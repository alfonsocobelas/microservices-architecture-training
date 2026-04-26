import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { AggregateRoot } from 'src/contexts/shared/domain/aggregate-root'
import { EngineError } from './engine-errors'
import { ENGINE_CONSTRAINTS as LIMITS } from './engine-constants'
import { EngineAggregateProps, EnginePrimitiveProps } from './engine-types'
import { EngineStatus } from './value-objects/engine-status.vo'
import { EngineHealthScore } from './value-objects/engine-health-score.vo'
import { EngineIsInstalled } from './value-objects/engine-is-installed.vo'
import { EngineSerialNumber } from './value-objects/engine-serial-number.vo'
import { EngineFlyingHoursAccumulated } from './value-objects/engine-flying-hours-accumulated.vo'
import { EngineCyclesSinceLastOverhaul } from './value-objects/engine-cycles-since-last-overhaul.vo'
import { EngineRegisteredDomainEvent } from './events/engine-registered.event'
import { EngineInstalledInAircraftDomainEvent } from './events/engine-installed-in-aircraft.event'
import { EngineRemovedFromAircraftDomainEvent } from './events/engine-removed-from-aircraft.event'
import { EngineStatusUpdatedToMaintenanceDomainEvent } from './events/engine-status-updated-to-maintenance.event'

export class Engine extends AggregateRoot {
  private constructor(
    readonly id: EngineId,
    readonly serialNumber: EngineSerialNumber,
    readonly healthScore: EngineHealthScore,
    readonly flyingHoursAccumulated: EngineFlyingHoursAccumulated,
    readonly cyclesSinceLastOverhaul: EngineCyclesSinceLastOverhaul,
    private _isInstalled: EngineIsInstalled,
    private _status: EngineStatus,
    private _aircraftId?: AircraftId
  ) {
    super()
  }

  //#region ... Getters ...
  get isInstalled(): EngineIsInstalled {
    return this._isInstalled
  }

  get aircraftId(): AircraftId | undefined {
    return this._aircraftId
  }

  get status(): EngineStatus {
    return this._status
  }
  //#endregion

  static create(props: EngineAggregateProps): Engine {
    const engine = new Engine(
      props.id,
      props.serialNumber,
      EngineHealthScore.max(),
      EngineFlyingHoursAccumulated.initial(),
      EngineCyclesSinceLastOverhaul.initial(),
      EngineIsInstalled.notInstalled(),
      EngineStatus.operational()
    )

    engine.record(new EngineRegisteredDomainEvent({
      aggregateId: engine.id.value,
      serialNumber: engine.serialNumber.value,
      healthScore: engine.healthScore.value,
      flyingHoursAccumulated: engine.flyingHoursAccumulated.value,
      cyclesSinceLastOverhaul: engine.cyclesSinceLastOverhaul.value,
      isInstalled: engine.isInstalled.value,
      status: engine.status.value
    }))

    return engine
  }

  static fromPrimitives(props: EnginePrimitiveProps): Engine {
    return new Engine(
      EngineId.create(props.id),
      EngineSerialNumber.create(props.serialNumber),
      EngineHealthScore.create(props.healthScore),
      EngineFlyingHoursAccumulated.create(props.flyingHoursAccumulated),
      EngineCyclesSinceLastOverhaul.create(props.cyclesSinceLastOverhaul),
      EngineIsInstalled.create(props.isInstalled),
      EngineStatus.create(props.status),
      props.aircraftId ? AircraftId.create(props.aircraftId) : undefined
    )
  }

  toPrimitives(): EnginePrimitiveProps {
    return {
      id: this.id.value,
      status: this.status.value,
      aircraftId: this.aircraftId?.value,
      isInstalled: this.isInstalled.value,
      healthScore: this.healthScore.value,
      serialNumber: this.serialNumber.value,
      flyingHoursAccumulated: this.flyingHoursAccumulated.value,
      cyclesSinceLastOverhaul: this.cyclesSinceLastOverhaul.value
    }
  }

  equals(other: AggregateRoot): boolean {
    if (!(other instanceof Engine)) {
      return false
    }

    return this.id.equals(other.id) &&
      this.serialNumber.equals(other.serialNumber) &&
      this.healthScore.equals(other.healthScore) &&
      this.flyingHoursAccumulated.equals(other.flyingHoursAccumulated) &&
      this.cyclesSinceLastOverhaul.equals(other.cyclesSinceLastOverhaul) &&
      this.isInstalled.equals(other.isInstalled) &&
      this.status.equals(other.status) &&
      ((this.aircraftId === undefined && other.aircraftId === undefined) ||
        (this.aircraftId !== undefined && other.aircraftId !== undefined && this.aircraftId.equals(other.aircraftId)))
  }

  installInAircraft(aircraftId: AircraftId): void {
    this.ensureCanBeInstalled()
    this._isInstalled = EngineIsInstalled.installed()
    this._aircraftId = aircraftId

    this.record(new EngineInstalledInAircraftDomainEvent({
      aggregateId: this.id.value,
      aircraftId: aircraftId.value
    }))
  }

  removeFromAircraft(aircraftId: AircraftId): void {
    this.ensureCanBeRemoved(aircraftId)
    this._isInstalled = EngineIsInstalled.notInstalled()
    this._aircraftId = undefined

    this.record(new EngineRemovedFromAircraftDomainEvent({
      aggregateId: this.id.value,
      aircraftId: aircraftId.value
    }))
  }

  updateStatusToMaintenance(): void {
    if (!this.status.isOperational()) {
      throw new EngineError('Only operational engines can be set to maintenance status')
    }

    this._status = EngineStatus.maintenance()

    this.record(new EngineStatusUpdatedToMaintenanceDomainEvent({
      aggregateId: this.id.value
    }))
  }

  private ensureCanBeInstalled(): void {
    if (this.isInstalled.isInstalled()) {
      throw new EngineError(`Engine ${this.id} is already installed on the other aircraft`)
    }

    if (!this.status.isOperational()) {
      throw new EngineError('Only operational engines can be installed')
    }

    if (this.healthScore.value < LIMITS.HEALTH_SCORE.MIN) {
      throw new EngineError(`Engine health score must be at least ${LIMITS.HEALTH_SCORE.MIN} to be installed`)
    }
  }

  private ensureCanBeRemoved(aircraftId: AircraftId): void {
    if (this.isInstalled.notInstalled()) {
      throw new EngineError(`Engine ${this.id} is not installed on any aircraft`)
    }

    if (!this._aircraftId?.equals(aircraftId)) {
      throw new EngineError(`Engine ${this.id} is installed on a different aircraft`)
    }
  }
}
