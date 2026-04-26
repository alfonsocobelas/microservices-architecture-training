import { BusinessRuleViolationError } from '@libs/shared/errors'

export class FleetError extends BusinessRuleViolationError {
  constructor(message: string, cause?: unknown) {
    super(message, 'Fleet', cause)
  }
}
