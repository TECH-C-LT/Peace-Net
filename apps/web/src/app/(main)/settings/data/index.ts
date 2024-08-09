'use server'

import { createClient } from '~/lib/supabase/server'

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
    .select(
      `
  *,
  plans (
    id,
    name,
    total_request_limit
  )
`,
    )
    .eq('user_id', user.id)
    .single()

  if (error) {
    return null
  }

  return data
}
