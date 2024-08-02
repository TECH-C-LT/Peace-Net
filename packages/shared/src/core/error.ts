const prefix = '[Peace Net]:'

export class NotImplementedError extends Error {
  constructor(message: string = 'Not implemented') {
    super(message)
    this.name = `${prefix} Not Implemented Error`
  }
}

export class ValidationError extends Error {
  constructor(message: string = 'Invalid input') {
    super(message)
    this.name = `${prefix} Invalid Input Error`
  }
}

export class NotFoundError extends Error {
  constructor(message: string = 'Not found') {
    super(message)
    this.name = `${prefix} Not Found Error`
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = 'Unauthorized') {
    super(message)
    this.name = `${prefix} Unauthorized Error`
  }
}
