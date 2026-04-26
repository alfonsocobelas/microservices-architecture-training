import { faker } from '@faker-js/faker'

export function randomUuidV7(): string {
  return faker.string.uuid({ version: 7 })
}
