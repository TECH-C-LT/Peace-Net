import { Database } from '@peace-net/shared/types/database'
import type { SupabaseClient } from '@supabase/supabase-js'

import { ApiKeyInfo } from './apiKey.type'

export interface IApiKeyRepository {
  getApiKeyWithEncryptedKey(encryptedKey: string): Promise<ApiKeyInfo | null>
}

export class ApiKeyRepository implements IApiKeyRepository {
  constructor(private supabase: SupabaseClient<Database>) {}

  async getApiKeyWithEncryptedKey(
    encryptedKey: string,
  ): Promise<ApiKeyInfo | null> {
    const { data, error } = await this.supabase
      .from('api_keys')
      .select('*')
      .eq('encrypted_key', encryptedKey)
      .single()

    if (error) {
      return null
    }

    return data || null
  }
}
