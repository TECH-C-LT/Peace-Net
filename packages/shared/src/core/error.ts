const prefix = '[Peace Net]:'

/**
 * 未実装の機能を表すエラー
 */
export class NotImplementedError extends Error {
  constructor(message: string = 'Not implemented') {
    super(message)
    this.name = `${prefix} Not Implemented Error`
  }
}

/**
 * 入力値が不正であることを表すエラー
 */
export class ValidationError extends Error {
  constructor(message: string = 'Invalid input') {
    super(message)
    this.name = `${prefix} Invalid Input Error`
  }
}

/**
 * リソースが見つからないことを表すエラー
 */
export class NotFoundError extends Error {
  constructor(message: string = 'Not found') {
    super(message)
    this.name = `${prefix} Invalid Request Error`
  }
}

/**
 * 認証エラーを表すエラー
 */
export class UnauthorizedError extends Error {
  constructor(message: string = 'Unauthorized') {
    super(message)
    this.name = `${prefix} Unauthorized Error`
  }
}

/**
 * 使用回数の上限を超えたことを表すエラー
 */
export class UsageLimitExceededError extends Error {
  constructor(message: string = 'Usage limit exceeded') {
    super(message)
    this.name = `${prefix} Usage Limit Exceeded Error`
  }
}

/**
 * サーバーエラーを表すエラー
 */
export class InternalServerError extends Error {
  constructor(message: string = 'Internal server error') {
    super(message)
    this.name = `${prefix} Internal Server Error`
  }
}
