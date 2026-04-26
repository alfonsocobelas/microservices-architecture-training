import http from 'http-status'

export class BaseCustomError extends Error {
  status: number
  cause?: unknown

  constructor(
    message: string,
    status: number = http.INTERNAL_SERVER_ERROR,
    cause?: unknown
  ) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)
    this.name = new.target.name
    this.status = status
    this.cause = cause
    Error.captureStackTrace(this, this.constructor)
  }

  getResponse() {
    return {
      name: this.name,
      message: this.message
    }
  }

  getStatus() {
    return this.status
  }
}

export class EntityNotFoundError extends BaseCustomError {
  constructor(entity: string, id: string, cause?: unknown) {
    super(`${entity} with id "${id}" not found.`, http.NOT_FOUND, cause)
  }
}

export class AlreadyExistsError extends BaseCustomError {
  constructor(entity: string, field: string, value: string, cause?: unknown) {
    super(`${entity} with ${field} "${value}" already exists.`, http.CONFLICT, cause)
  }
}

export abstract class BusinessRuleViolationError extends BaseCustomError {
  constructor(message: string = 'Domain validation error', entityName: string, cause?: unknown) {
    super(`[${entityName}]: ${message}`, http.UNPROCESSABLE_ENTITY, cause)
  }
}

export class InvalidArgumentError extends BaseCustomError {
  constructor(message: string = 'Invalid argument error', cause?: unknown) {
    super(message, http.BAD_REQUEST, cause)
  }
}

export class InvalidRequestError extends BaseCustomError {
  constructor(message: string = 'Invalid request data', cause?: unknown) {
    super(message, http.BAD_REQUEST, cause)
  }
}
