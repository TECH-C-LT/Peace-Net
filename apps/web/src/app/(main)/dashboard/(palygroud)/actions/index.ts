'use server'

import { parseWithZod } from '@conform-to/zod'

import { createClient } from '~/lib/supabase/server'

import { playgroundSchema } from '../schemas'

export async function handlePlayground(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: playgroundSchema })
  return submission.reply()
}

export async function fetchApi(
  api: string,
  type: string,
  content: string,
  score_threshold?: number,
) {
  const body = {
    ...(type === 'text' ? { text: content } : { image: content }),
    ...(api === 'guardians' && { score_threshold }),
  }

  const response = await fetch(`${process.env.API_URL}/v1/${api}/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PLAYGROUND_API_KEY}`,
    },
    body: JSON.stringify(body),
  })

  const result = await response.json()

  return result
}

export async function checkUsageCount(): Promise<number> {
  const supabase = createClient()

  const { data } = await supabase.auth.getUser()

  if (!data.user?.id) {
    throw new Error('User not found')
  }

  const PlaygroundUsageRes = await supabase
    .from('playground_usage')
    .select('count')
    .eq('user_id', data.user?.id)

  return PlaygroundUsageRes.data?.[0]?.count as number
}

export async function incrementPlaygroundUsage() {
  const supabase = createClient()

  const { data } = await supabase.auth.getUser()

  const { data: res, error } = await (supabase.rpc as any)(
    'increment_playground_usage',
    {
      input_user_id: data.user?.id,
    },
  )

  if (error) {
    console.error(error)
    throw new Error('Failed to increment playground usage')
  }

  return
}
