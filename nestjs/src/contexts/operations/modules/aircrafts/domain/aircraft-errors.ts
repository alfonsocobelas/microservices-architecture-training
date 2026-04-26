import { BusinessRuleViolationError } from 'src/contexts/shared/errors'

export class AircraftError extends BusinessRuleViolationError {
  constructor(message: string, cause?: unknown) {
    super(message, 'Aircraft', cause)
  }
}
