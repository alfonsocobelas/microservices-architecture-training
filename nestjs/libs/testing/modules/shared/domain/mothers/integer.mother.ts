import { MotherCreator } from './mother-creator'

export class IntegerMother {
  static random({ min = 0, max = 100 }: { min?: number; max?: number }): number {
    return MotherCreator.random().number.int({ min, max })
  }
}
