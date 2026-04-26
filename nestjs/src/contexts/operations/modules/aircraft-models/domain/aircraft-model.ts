import { AggregateRoot } from 'src/contexts/shared/domain/aggregate-root'
import { AircraftModelError } from './aircraft-model-errors'
import { AircraftModelAggregateProps, AircraftModelPrimitiveProps } from './aircraft-model-types'
import { AircraftModelId } from './value-objects/aircraft-model-id.vo'
import { AircraftModelName } from './value-objects/aircraft-model-name.vo'
import { AircraftModelCode } from './value-objects/aircraft-model-code.vo'
import { AircraftModelStatus } from './value-objects/aircraft-model-status.vo'
import { AircraftModelNumEngines } from './value-objects/aircraft-model-num-engines.vo'
import { AircraftModelManufacturer } from './value-objects/aircraft-model-manufacturer.vo'
import { AircraftModelPassengerCapacity } from './value-objects/aircraft-model-passenger-capacity.vo'
import { AircraftModelRemovedDomainEvent } from './events/aircraft-model-removed.event'
import { AircraftModelRegisteredDomainEvent } from './events/aircraft-model-registered.event'

export class AircraftModel extends AggregateRoot {
  private constructor(
    readonly id: AircraftModelId,
    readonly name: AircraftModelName,
    readonly code: AircraftModelCode,
    readonly manufacturer: AircraftModelManufacturer,
    readonly passengerCapacity: AircraftModelPassengerCapacity,
    readonly numEngines: AircraftModelNumEngines,
    private _status: AircraftModelStatus
  ) {
    super()
  }

  //#region ... Getters ...
  get status(): AircraftModelStatus {
    return this._status
  }
  //#endregion

  static create(props: AircraftModelAggregateProps): AircraftModel {
    const aircraftModel = new AircraftModel(
      props.id,
      props.name,
      props.code,
      props.manufacturer,
      props.passengerCapacity,
      props.numEngines,
      AircraftModelStatus.draft()
    )

    aircraftModel.record(new AircraftModelRegisteredDomainEvent({
      aggregateId: aircraftModel.id.value,
      name: aircraftModel.name.value,
      code: aircraftModel.code.value,
      manufacturer: aircraftModel.manufacturer.value,
      passengerCapacity: aircraftModel.passengerCapacity.value,
      numEngines: aircraftModel.numEngines.value,
      status: aircraftModel.status.value
    }))

    return aircraftModel
  }

  static fromPrimitives(props: AircraftModelPrimitiveProps): AircraftModel {
    return new AircraftModel(
      AircraftModelId.create(props.id),
      AircraftModelName.create(props.name),
      AircraftModelCode.create(props.code),
      AircraftModelManufacturer.create(props.manufacturer),
      AircraftModelPassengerCapacity.create(props.passengerCapacity),
      AircraftModelNumEngines.create(props.numEngines),
      AircraftModelStatus.create(props.status)
    )
  }

  equals(other: AggregateRoot): boolean {
    if (!(other instanceof AircraftModel)) {
      return false
    }

    return this.id.equals(other.id) &&
      this.name.equals(other.name) &&
      this.code.equals(other.code) &&
      this.manufacturer.equals(other.manufacturer) &&
      this.passengerCapacity.equals(other.passengerCapacity) &&
      this.numEngines.equals(other.numEngines) &&
      this.status.equals(other.status)
  }

  toPrimitives(): AircraftModelPrimitiveProps {
    return {
      id: this.id.value,
      name: this.name.value,
      code: this.code.value,
      manufacturer: this.manufacturer.value,
      passengerCapacity: this.passengerCapacity.value,
      numEngines: this.numEngines.value,
      status: this.status.value
    }
  }

  remove(aircraftCount: number): void {
    this.ensureCanBeRemoved(aircraftCount)

    this.record(new AircraftModelRemovedDomainEvent({
      aggregateId: this.id.value,
      name: this.name.value,
      code: this.code.value,
      manufacturer: this.manufacturer.value
    }))
  }

  activate(): void {
    this.ensureCanBeActivated()
    this._status = AircraftModelStatus.operational()
  }

  withdraw(): void {
    this.ensureCanBeWithdrawn()
    this._status = AircraftModelStatus.withdraw()
  }

  decommission(): void {
    this.ensureCanBeDecommissioned()
    this._status = AircraftModelStatus.decommissioned()
  }

  // invariants
  private ensureCanBeRemoved(totalAircraftCount: number): void {
    if (totalAircraftCount > 0) {
      throw new AircraftModelError('Cannot remove model with associated aircraft')
    }
  }

  private ensureCanBeActivated(): void {
    if (!this._status.isDraft() && !this._status.isWithdrawn()) {
      throw new AircraftModelError('Only draft or withdrawn models can be activated')
    }
  }

  private ensureCanBeWithdrawn(): void {
    if (!this._status.isOperational()) {
      throw new AircraftModelError('Only operational models can be withdrawn')
    }
  }

  private ensureCanBeDecommissioned(): void {
    if (!this._status.isOperational()) {
      throw new AircraftModelError('Only operational models can be decommissioned')
    }
  }
}
