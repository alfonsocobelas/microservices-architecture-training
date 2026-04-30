import { MotherCreator } from './mother-creator'

export class StringMother {
  static random({ minLength = 1, maxLength }: { minLength?: number; maxLength: number }): string {
    return MotherCreator.random().string.alphanumeric({ length: { min: minLength, max: maxLength } })
  }
}
