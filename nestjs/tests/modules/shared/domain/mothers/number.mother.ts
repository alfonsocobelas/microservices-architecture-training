import { MotherCreator } from './mother-creator'

export class NumberMother {
  static random({ min = 0, max = 100 }: { min?: number; max?: number }): number {
    return MotherCreator.random().number.float({ min, max })
  }
}
