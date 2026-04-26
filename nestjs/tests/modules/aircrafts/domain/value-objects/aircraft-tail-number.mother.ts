import { AircraftTailNumber } from 'src/contexts/operations/modules/aircrafts/domain/value-objects/aircraft-tail-number.vo'
import { StringMother } from '../../../shared/domain/mothers/string.mother'
import { AIRCRAFT_CONSTRAINTS as LIMITS } from 'src/contexts/operations/modules/aircrafts/domain/aircraft-constants'

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
