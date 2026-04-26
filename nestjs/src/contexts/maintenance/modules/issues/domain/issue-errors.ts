import { BusinessRuleViolationError } from 'src/contexts/shared/errors'

export class IssueError extends BusinessRuleViolationError {
  constructor(message: string, cause?: unknown) {
    super(message, 'Issue', cause)
  }
}
