'use server'

import { parseWithZod } from '@conform-to/zod'

import { playgroundSchema } from '../schemas'

export async function handlePlayground(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: playgroundSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  // const { api, text } = submission.value

  // TODO: fetch API

  submission.value.result = `
  {
    "flagged": true,
    "categories": {
        "sexual": false,
        "hate": false,
        "self_harm": false,
        "violence": false,
        "defamation": true
    },
    "category_scores": {
        "sexual": 0,
        "hate": 0,
        "self_harm": 0,
        "violence": 0,
        "defamation": 0.3
    }
}
  `

  return {
    status: submission.status,
    value: submission.value,
  }
}
