import { MotherCreator } from './mother-creator'

export class EnumMother {
  static random<T extends object>(enumObj: T): T[keyof T] {
    const values = Object.values(enumObj) as T[keyof T][]
    return MotherCreator.random().helpers.arrayElement(values)
  }
}
