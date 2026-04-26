import { randomUuidV7 } from '../../utils/ramdom-uuidv7'

export class UuidV7Mother {
  static random(): string {
    return randomUuidV7()
  }
}
