'use server'

import { createClient } from '~/lib/supabase/server'

export async function getUsageLogs() {
  const supabase = createClient()

  // 現在のユーザーを取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0]
  const endDate = new Date(year, month, 0).toISOString().split('T')[0]

  // ユーザーの使用状況ログを取得
  const { data, error } = await supabase
    .from('usage_logs')
    .select(
      `
      *,
      api_key:api_keys!inner(*)
    `,
    )
    .eq('api_key.user_id', user.id)
    .gte('date', startDate)
    .lte('date', endDate)

  if (error) {
    return null
  }

  return data
}

export async function getUserPlan() {
  const supabase = createClient()

  // 現在のユーザーを取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from('user_plans')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    return null
  }

  return data
}
