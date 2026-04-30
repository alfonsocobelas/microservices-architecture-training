
import { StringMother } from '@libs/testing'
import { AIRCRAFT_CONSTRAINTS as LIMITS } from '../../../../../src/modules/aircrafts/domain/aircraft-constants'
import { AircraftTailNumber } from '../../../../../src/modules/aircrafts/domain/value-objects/aircraft-tail-number.vo'

export class AircraftTailNumberMother {
  static create(value: string): AircraftTailNumber {
    return AircraftTailNumber.create(value)
  }

  static random(): AircraftTailNumber {
    return this.create(StringMother.random({
      minLength: LIMITS.TAIL_NUMBER.MIN_LENGTH,
      maxLength: LIMITS.TAIL_NUMBER.MAX_LENGTH
    }))
  }
}
