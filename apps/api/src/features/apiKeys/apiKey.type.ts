import { Database } from '@peace-net/shared/types/database'

export type ApiKeyInfo = Database['public']['Tables']['api_keys']['Row']

export type VerifyApiKeyInput = {
  apiKey: string
  encryptionKey: string
}

export type VerifyApiKeyOutput = {
  isValid: boolean
  error?: string
}
