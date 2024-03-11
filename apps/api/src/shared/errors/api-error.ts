import httpStatus from 'http-status'

export class ApiError extends Error {
  public readonly statusCode: number
  public readonly message: string
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.message = message
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, httpStatus.BAD_REQUEST)
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, httpStatus.NOT_FOUND)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, httpStatus.UNAUTHORIZED)
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, httpStatus.FORBIDDEN)
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, httpStatus.CONFLICT)
  }
}
