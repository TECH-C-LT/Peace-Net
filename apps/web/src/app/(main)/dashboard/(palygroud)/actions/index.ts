'use server'

import { parseWithZod } from '@conform-to/zod'

import { API_URL } from '~/lib/config'

import { playgroundSchema } from '../schemas'

export async function handlePlayground(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: playgroundSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const { api, text, score_threshold } = submission.value

  const result = await fetchApi(api, text, score_threshold)

  submission.value.result = JSON.stringify(result, null, 2)

  return {
    status: submission.status,
    value: submission.value,
  }
}

async function fetchApi(api: string, text: string, score_threshold: number) {
  const body = {
    text,
    ...(api === 'guardians' && { score_threshold }),
  }

  const response = await fetch(`${API_URL}/v1/${api}/text`, {
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
