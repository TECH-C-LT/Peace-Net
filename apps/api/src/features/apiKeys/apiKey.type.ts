export type VerifyApiKeyInput = {
  apiKey: string
  encryptionKey: string
}

export type VerifyApiKeyOutput = {
  isValid: boolean
  apiKeyId?: string
  userId?: string
  error?: string
}
