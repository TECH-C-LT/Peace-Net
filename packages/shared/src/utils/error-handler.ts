import { Context } from 'hono'
import { ZodError } from 'zod'
import {
  NotFoundError,
  NotImplementedError,
  UnauthorizedError,
  ValidationError,
} from '../core/error'

export interface ErrorResponse {
  error: string
  details: any
}

type CustomError =
  | NotFoundError
  | NotImplementedError
  | UnauthorizedError
  | ValidationError

function isCustomError(error: unknown): error is CustomError {
  return (
    error instanceof NotFoundError ||
    error instanceof NotImplementedError ||
    error instanceof UnauthorizedError ||
    error instanceof ValidationError
  )
}

export function handleError(c: Context, error: unknown): Response {
  let statusCode: 400 | 401 | 404 | 500 | 501 = 500
  let errorMessage = '[Peace Net]: Internal Server Error'
  let details: any

  if (isCustomError(error)) {
    statusCode =
      error instanceof NotImplementedError
        ? 501
        : error instanceof ValidationError
          ? 400
          : error instanceof NotFoundError
            ? 404
            : error instanceof UnauthorizedError
              ? 401
              : 500
    errorMessage = error.name
    details = error.message
  } else if (error instanceof ZodError) {
    statusCode = 400
    errorMessage = '[Peace Net]: Invalid Input Error'
    details = error.errors.map((e) => ({
      path: e.path,
      message: e.message,
      code: e.code,
    }))
  } else if (error instanceof Error) {
    errorMessage = error.name
    details = error.message
  }

  const errorResponse: ErrorResponse = {
    error: errorMessage,
    details,
  }

  return c.json(errorResponse, statusCode)
}
