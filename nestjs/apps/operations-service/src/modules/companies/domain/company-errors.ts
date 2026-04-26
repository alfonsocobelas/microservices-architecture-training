import { BusinessRuleViolationError } from '@libs/shared/errors'

export class CompanyError extends BusinessRuleViolationError {
  constructor(message: string, cause?: unknown) {
    super(message, 'Company', cause)
  }
}
