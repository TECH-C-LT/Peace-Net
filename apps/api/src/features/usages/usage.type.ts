export type CheckUsageInput = {
  userId: string
}

export type CheckUsageOutput = {
  isValid: boolean
}

export type IncrementUsageLogInput = {
  apiKeyId: string
  endpoint: string
  currentRequestCount: number
}
