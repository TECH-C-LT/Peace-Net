'use server'

import { createClient } from '~/lib/supabase/server'

type GraphData = {
  date: string
  [endpoint: string]: number | string
}

function prepareGraphData(
  usageLogs: {
    api_key_id: string | null
    date: string | null
    endpoint: string
    id: string
    request_count: number | null
    api_key: {
      created_at: string | null
      description: string | null
      expires_at: string | null
      id: string
      user_id: string | null
    }
  }[],
): GraphData[] {
  if (!usageLogs) return []

  const dataMap = new Map<string, GraphData>()

  usageLogs.forEach((log) => {
    if (log.date && log.request_count !== null) {
      const date = log.date.split('T')[0] // 日付部分のみを使用
      if (!dataMap.has(date)) {
        dataMap.set(date, { date })
      }
      const data = dataMap.get(date)!
      data[log.endpoint] =
        ((data[log.endpoint] as number) || 0) + log.request_count
    }
  })

  return Array.from(dataMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date),
  )
}

export async function getUsageLogs() {
  const supabase = createClient()

  // 現在のユーザーを取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  // const now = new Date()
  // const year = now.getFullYear()
  // const month = now.getMonth() + 1

  // const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0]
  // const endDate = new Date(year, month, 0).toISOString().split('T')[0]

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
  // .gte('date', startDate)
  // .lte('date', endDate)

  if (error) {
    return null
  }

  const graphData = prepareGraphData(data)

  return graphData
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
    .select(
      `
  *,
  plans (
    id,
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
