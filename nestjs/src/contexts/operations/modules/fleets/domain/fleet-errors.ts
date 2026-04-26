import { BusinessRuleViolationError } from 'src/contexts/shared/errors'

export class FleetError extends BusinessRuleViolationError {
  constructor(message: string, cause?: unknown) {
    super(message, 'Fleet', cause)
  }
}
