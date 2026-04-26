import { BusinessRuleViolationError } from 'src/contexts/shared/errors'

export class AircraftModelError extends BusinessRuleViolationError {
  constructor(message: string, cause?: unknown) {
    super(message, 'AircraftModel', cause)
  }
}
