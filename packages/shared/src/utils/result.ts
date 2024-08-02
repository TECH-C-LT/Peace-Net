export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }

interface SuccessResult<T> {
  ok: true
  value: T
}

interface ErrorResult {
  ok: false
  error: Error
}

export function success<T>(value: T): SuccessResult<T> {
  return { ok: true, value }
}

export function failure(error: unknown): ErrorResult {
  if (error instanceof Error) {
    return { ok: false, error }
  }
  return { ok: false, error: new Error('An error occurred') }
}
