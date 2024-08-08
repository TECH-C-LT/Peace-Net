import { encryptApiKey } from '@peace-net/shared/utils/encryptions'

import { IApiKeyRepository } from '~/features/apiKeys/apiKey.repository'
import type {
  VerifyApiKeyInput,
  VerifyApiKeyOutput,
} from '~/features/apiKeys/apiKey.type'

export interface IApiKeyService {
  verifyApiKey(input: VerifyApiKeyInput): Promise<VerifyApiKeyOutput>
}

export class ApiKeyService implements IApiKeyService {
  constructor(private apiKeyRepository: IApiKeyRepository) {}

  async verifyApiKey(input: VerifyApiKeyInput): Promise<VerifyApiKeyOutput> {
    const { apiKey, encryptionKey } = input

    // APIキーを暗号化
    const encryptedApiKey = encryptApiKey(apiKey, encryptionKey)

    // 暗号化されたAPIキーを使ってDBからAPIキー情報を取得
    const apiKeyInfo =
      await this.apiKeyRepository.getApiKeyWithEncryptedKey(encryptedApiKey)

    // 取得できなかった場合はエラー
    if (!apiKeyInfo || !apiKeyInfo.id || !apiKeyInfo.user_id) {
      return { isValid: false, error: 'Invalid API key' }
    }

    // 有効チェック
    if (!apiKeyInfo.is_active) {
      console.log('Inactive API key')
      return { isValid: false, error: 'Inactive API key' }
    }

    // 期限チェック
    if (
      apiKeyInfo.expires_at &&
      new Date(apiKeyInfo.expires_at + 'Z') < new Date()
    ) {
      return { isValid: false, error: 'Expired API key' }
    }

    return {
      isValid: true,
      apiKeyId: apiKeyInfo.id,
      userId: apiKeyInfo.user_id,
    }
  }
}
