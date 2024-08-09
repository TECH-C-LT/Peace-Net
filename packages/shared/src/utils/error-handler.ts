import { Context } from 'hono'
import { ZodError } from 'zod'
import {
  InternalServerError,
  NotFoundError,
  NotImplementedError,
  UnauthorizedError,
  UsageLimitExceededError,
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
  | UsageLimitExceededError

function isCustomError(error: unknown): error is CustomError {
  return (
    error instanceof NotFoundError ||
    error instanceof NotImplementedError ||
    error instanceof UnauthorizedError ||
    error instanceof ValidationError ||
    error instanceof UsageLimitExceededError ||
    error instanceof InternalServerError
  )
}

/**
 * エラーを処理し、エラーレスポンスを返します
 *
 * @param c - コンテキスト
 * @param error - エラーオブジェクト
 * @returns エラーレスポンス
 */
export function handleError(c: Context, error: unknown): Response {
  let statusCode: 400 | 401 | 404 | 429 | 500 | 501 = 500
  let errorMessage = '[Peace Net]: Internal Server Error'
  let details: any = 'Sorry, something went wrong. Please try again later.'

  if (isCustomError(error)) {
    switch (error.constructor) {
      case NotImplementedError:
        statusCode = 501
        break
      case ValidationError:
        statusCode = 400
        break
      case NotFoundError:
        statusCode = 404
        break
      case UnauthorizedError:
        statusCode = 401
        break
      case UsageLimitExceededError:
        statusCode = 429
        break
      case InternalServerError:
        statusCode = 500
        break
      default:
        statusCode = 500
        break
    }
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
    errorMessage = `[Peace Net]: ${error.name}`
    details = error.message
  }

  const errorResponse: ErrorResponse = {
    error: errorMessage,
    details,
  }

  return c.json(errorResponse, statusCode)
}
