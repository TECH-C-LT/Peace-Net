import crypto from 'crypto-js'

export function encryptApiKey(apiKey: string, encryptionKey: string): string {
  return crypto.SHA256(apiKey + encryptionKey).toString()
}
