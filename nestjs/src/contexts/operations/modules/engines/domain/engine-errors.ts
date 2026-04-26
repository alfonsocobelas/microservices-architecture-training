import { BusinessRuleViolationError } from 'src/contexts/shared/errors'

export class EngineError extends BusinessRuleViolationError {
  constructor(message: string, cause?: unknown) {
    super(message, 'Engine', cause)
  }
}
