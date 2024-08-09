import { Database } from '@peace-net/shared/types/database'
import type { SupabaseClient } from '@supabase/supabase-js'

export interface IUsageLogRepository {
  incrementUsageLog: (
    apiKeyId: string,
    endpoint: string,
    date: string,
  ) => Promise<void>
}

export class UsageLogRepository implements IUsageLogRepository {
  constructor(private supabase: SupabaseClient<Database>) {}

  async incrementUsageLog(apiKeyId: string, endpoint: string, date: string) {
    const { error } = await (this.supabase.rpc as any)('increment_usage_log', {
      p_api_key_id: apiKeyId,
      p_endpoint: endpoint,
      p_date: date,
    })

    if (error) {
      throw new Error(`Failed to increment usage log: ${error.message}`)
    }
  }
}
