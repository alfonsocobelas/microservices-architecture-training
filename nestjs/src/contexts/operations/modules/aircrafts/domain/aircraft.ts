import { FleetId } from 'src/contexts/operations/modules/fleets/domain/value-objects/fleet-id.vo'
import { EngineId } from 'src/contexts/shared/domain/value-objects/engines/engine-id.vo'
import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { AggregateRoot } from 'src/contexts/shared/domain/aggregate-root'
import { AircraftModelId } from 'src/contexts/operations/modules/aircraft-models/domain/value-objects/aircraft-model-id.vo'
import { AircraftModelNumEngines } from 'src/contexts/operations/modules/aircraft-models/domain/value-objects/aircraft-model-num-engines.vo'
import { AircraftError } from './aircraft-errors'
import { AircraftAggregateProps, AircraftPrimitiveProps } from './aircraft-types'
import { AircraftStatus } from './value-objects/aircraft-status.vo'
import { AircraftIsActive } from './value-objects/aircraft-is-active.vo'
import { AircraftEngineIds } from './value-objects/aircraft-engineIds.vo'
import { AircraftTailNumber } from './value-objects/aircraft-tail-number.vo'
import { AircraftTotalFlightHours } from './value-objects/aircraft-total-flight-hours.vo'
import { AircraftFuelLevelPercentage } from './value-objects/aircraft-fuel-level-percentage.vo'
import { AircraftRemovedDomainEvent } from './events/aircraft-removed.event'
import { AircraftRegisteredDomainEvent } from './events/aircraft-registered.event'
import { AircraftAddedToFleetDomainEvent } from './events/aircraft-added-to-fleet.event'
import { AircraftEngineRemovedDomainEvent } from './events/aircraft-engine-removed.event'
import { AircraftEngineInstalledDomainEvent } from './events/aircraft-engine-installed.event'
import { AircraftRetiredFromFleetDomainEvent } from './events/aircraft-retired-from-fleet.event'
import { AircraftStatusUpdatedToMaintenanceDomainEvent } from './events/aircraft-status-updated-to-maintenance.event'

export class Aircraft extends AggregateRoot {
  private constructor(
    readonly id: AircraftId,
    readonly modelId: AircraftModelId,
    readonly tailNumber: AircraftTailNumber,
    private _engineIds: AircraftEngineIds,
    private _status: AircraftStatus,
    private _isActive: AircraftIsActive,
    private _totalFlightHours: AircraftTotalFlightHours,
    private _fuelLevelPercentage: AircraftFuelLevelPercentage,
    private _fleetId?: FleetId
  ) {
    super()
  }

  //#region ... Getters ...
  get totalFlightHours(): AircraftTotalFlightHours {
    return this._totalFlightHours
  }

  get fuelLevelPercentage(): AircraftFuelLevelPercentage {
    return this._fuelLevelPercentage
  }

  get status(): AircraftStatus {
    return this._status
  }

  get isActive(): AircraftIsActive {
    return this._isActive
  }

  get engineIds(): AircraftEngineIds {
    return this._engineIds
  }

  get fleetId(): FleetId | undefined {
    return this._fleetId
  }
  //#endregion

  static create(props: AircraftAggregateProps): Aircraft {
    const aircraft = new Aircraft(
      props.id,
      props.modelId,
      props.tailNumber,
      AircraftEngineIds.empty(),
      AircraftStatus.draft(),
      AircraftIsActive.inactive(),
      AircraftTotalFlightHours.min(),
      AircraftFuelLevelPercentage.min()
    )

    aircraft.record(new AircraftRegisteredDomainEvent({
      aggregateId: aircraft.id.value,
      modelId: aircraft.modelId.value,
      tailNumber: aircraft.tailNumber.value,
      engineIds: aircraft.engineIds.values,
      status: aircraft.status.value,
      isActive: aircraft.isActive.value,
      totalFlightHours: aircraft.totalFlightHours.value,
      fuelLevelPercentage: aircraft.fuelLevelPercentage.value
    }))

    return aircraft
  }

  static fromPrimitives(props: AircraftPrimitiveProps): Aircraft {
    return new Aircraft(
      AircraftId.create(props.id),
      AircraftModelId.create(props.modelId),
      AircraftTailNumber.create(props.tailNumber),
      AircraftEngineIds.create(props.engineIds),
      AircraftStatus.create(props.status),
      AircraftIsActive.create(props.isActive),
      AircraftTotalFlightHours.create(props.totalFlightHours),
      AircraftFuelLevelPercentage.create(props.fuelLevelPercentage),
      props.fleetId ? FleetId.create(props.fleetId) : undefined
    )
  }

  toPrimitives(): AircraftPrimitiveProps {
    return {
      id: this.id.value,
      status: this._status.value,
      modelId: this.modelId.value,
      fleetId: this._fleetId?.value,
      isActive: this._isActive.value,
      engineIds: this._engineIds.values,
      tailNumber: this.tailNumber.value,
      totalFlightHours: this._totalFlightHours.value,
      fuelLevelPercentage: this._fuelLevelPercentage.value
    }
  }

  equals(other: AggregateRoot): boolean {
    if (!(other instanceof Aircraft)) {
      return false
    }

    return this.id.equals(other.id) &&
      this.modelId.equals(other.modelId) &&
      this.tailNumber.equals(other.tailNumber) &&
      this._engineIds.equals(other._engineIds) &&
      this._status.equals(other._status) &&
      this._isActive.equals(other._isActive) &&
      this._totalFlightHours.equals(other._totalFlightHours) &&
      this._fuelLevelPercentage.equals(other._fuelLevelPercentage) &&
      ((this._fleetId === undefined && other._fleetId === undefined) ||
        (this._fleetId !== undefined && other._fleetId !== undefined && this._fleetId.equals(other._fleetId)))
  }

  remove(): void {
    this.record(new AircraftRemovedDomainEvent({
      aggregateId: this.id.value,
      modelId: this.modelId.value,
      tailNumber: this.tailNumber.value,
      engineIds: this._engineIds.values,
      fleetId: this._fleetId?.value
    }))
  }

  installEngine(engineId: EngineId, numEngines: AircraftModelNumEngines): void {
    this.ensureEngineCanBeInstalled(engineId, numEngines)
    this._engineIds = this._engineIds.add(engineId)

    this.record(new AircraftEngineInstalledDomainEvent({
      aggregateId: this.id.value,
      engineId: engineId.value
    }))
  }

  removeEngine(engineId: EngineId): void {
    this.ensureEngineCanBeRemoved(engineId)
    this._engineIds = this._engineIds.remove(engineId)

    this.record(new AircraftEngineRemovedDomainEvent({
      aggregateId: this.id.value,
      engineId: engineId.value
    }))
  }

  addToFleet(fleetId: FleetId): void {
    this.ensureCanAddToFleet()
    this._fleetId = fleetId

    this.record(new AircraftAddedToFleetDomainEvent({
      aggregateId: this.id.value,
      fleetId: fleetId.value
    }))
  }

  retireFromFleet(fleetId: FleetId): void {
    this.ensureCanRetireFromFleet(fleetId)
    this._fleetId = undefined

    this.record(new AircraftRetiredFromFleetDomainEvent({
      aggregateId: this.id.value,
      fleetId: fleetId.value
    }))
  }

  updateStatusToMaintenance(): void {
    if (!this.status.isActive()) {
      throw new AircraftError('Only active aircraft can be set to maintenance status.')
    }

    this._status = AircraftStatus.maintenance()

    this.record(new AircraftStatusUpdatedToMaintenanceDomainEvent({
      aggregateId: this.id.value
    }))
  }

  private ensureEngineCanBeInstalled(engineId: EngineId, numEngines: AircraftModelNumEngines): void {
    if (!this.status.isActiveOrMaintenance()) {
      throw new AircraftError('Engines can only be installed on active or in-maintenance aircraft.')
    }

    if (this._engineIds.isFull(numEngines)) {
      throw new AircraftError('Cannot install more engines than the model allows.')
    }

    if (this._engineIds.contains(engineId)) {
      throw new AircraftError(`Engine with ID ${engineId.value} is already installed on aircraft ${this.id.value}.`)
    }
  }

  private ensureEngineCanBeRemoved(engineId: EngineId): void {
    if (this.status.isActive()) {
      throw new AircraftError('Engines can only be removed from in-maintenance aircraft.')
    }

    if (!this._engineIds.contains(engineId)) {
      throw new AircraftError(`Engine with ID ${engineId.value} is not installed on aircraft ${this.id.value}.`)
    }
  }

  private ensureCanAddToFleet(): void {
    if (this._fleetId) {
      throw new AircraftError(`Aircraft is already assigned to fleet ${this._fleetId.value}.`)
    }
  }

  private ensureCanRetireFromFleet(fleetId: FleetId): void {
    if (!this._fleetId?.equals(fleetId)) {
      throw new AircraftError(`Aircraft is not assigned to fleet ${fleetId.value}.`)
    }
  }
}
