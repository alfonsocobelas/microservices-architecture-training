import { AircraftId } from 'src/contexts/shared/domain/value-objects/aircrafts/aircraft-id.vo'
import { ValueObjectList } from 'src/contexts/shared/domain/value-objects/value-object-list'
import { FleetError } from '../fleet-errors'

export class FleetAircraftIds extends ValueObjectList<AircraftId, FleetAircraftIds> {
  private constructor(aircraftIds: AircraftId[]) {
    super(aircraftIds)
  }

  static create(aircraftIds: string[]): FleetAircraftIds {
    this.ensureHasAtLeastOne(aircraftIds)
    const vos = aircraftIds.map(id => AircraftId.create(id))
    return new FleetAircraftIds(vos)
  }

  add(item: AircraftId): FleetAircraftIds {
    return new FleetAircraftIds([...this._items, item])
  }

  remove(item: AircraftId): FleetAircraftIds {
    return new FleetAircraftIds(this._items.filter(id => !id.equals(item)))
  }

  static empty(): FleetAircraftIds {
    return new FleetAircraftIds([])
  }

  private static ensureHasAtLeastOne(ids: string[]): void {
    if (!ids.length) {
      throw new FleetError('A fleet must be registered with at least one aircraft')
    }
  }
}
