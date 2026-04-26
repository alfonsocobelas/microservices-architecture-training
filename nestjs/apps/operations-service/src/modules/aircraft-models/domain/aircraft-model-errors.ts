import { BusinessRuleViolationError } from '@libs/shared/errors'

export class AircraftModelError extends BusinessRuleViolationError {
  constructor(message: string, cause?: unknown) {
    super(message, 'AircraftModel', cause)
  }
}
