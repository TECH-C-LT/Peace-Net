import { parseWithZod } from '@conform-to/zod'

import { prismSchema } from '../schemas/prism'
import { checkUsageCount, fetchApi, incrementPlaygroundUsage } from '.'

export async function PrismAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: prismSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const { api, text, type } = submission.value

  const count = await checkUsageCount()

  if (count >= 10) {
    submission.value.isLimitReached = true
    return {
      status: submission.status,
      value: submission.value,
    }
  }

  const result = await fetchApi(api, type, text)

  await incrementPlaygroundUsage()

  submission.value.result = JSON.stringify(result, null, 2)

  return {
    status: submission.status,
    value: submission.value,
  }
}
