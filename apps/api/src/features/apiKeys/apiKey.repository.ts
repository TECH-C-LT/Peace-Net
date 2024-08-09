import { Database } from '@peace-net/shared/types/database'
import { ApiKey } from '@peace-net/shared/types/entities'
import type { SupabaseClient } from '@supabase/supabase-js'

export interface IApiKeyRepository {
  getApiKeyWithEncryptedKey(encryptedKey: string): Promise<ApiKey | null>
}

export class ApiKeyRepository implements IApiKeyRepository {
  constructor(private supabase: SupabaseClient<Database>) {}

  async getApiKeyWithEncryptedKey(
    encryptedKey: string,
  ): Promise<ApiKey | null> {
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
