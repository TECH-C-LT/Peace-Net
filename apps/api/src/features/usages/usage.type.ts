export type CheckUsageInput = {
  userId: string
}

export type CheckUsageOutput = {
  isValid: boolean
  totalRequestsUsed: number
}

export type IncrementUsageLogInput = {
  apiKeyId: string
  endpoint: string
  currentRequestCount: number
}
