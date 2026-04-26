import { faker } from '@faker-js/faker'

export function randomDate(start: Date, end: Date): Date {
  return faker.date.between({ from: start, to: end })
}
