'use server'

import { convertToJapanTime } from '@peace-net/shared/utils/date'
import { createClient } from '~/lib/supabase/server'

export async function getApiKeys() {
  const supabase = createClient()

  // 現在のユーザーを取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  // APIキーをDBから取得
  const { data, error } = await supabase
    .from('api_keys')
    .select('name, description, expires_at, last_used, created_at')
    .eq('user_id', user.id)
  if (error) {
    console.error(error)
    return null
  }

  for (const apiKey of data) {
    apiKey.expires_at = convertToJapanTime(apiKey.expires_at)
    apiKey.last_used = convertToJapanTime(apiKey.last_used)
    apiKey.created_at = convertToJapanTime(apiKey.created_at)
  }

  return data
}
