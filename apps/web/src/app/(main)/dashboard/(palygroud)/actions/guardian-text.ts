import { parseWithZod } from '@conform-to/zod'

import { guardianTextSchema } from '../schemas/guardian'
import { checkUsageCount, fetchApi, incrementPlaygroundUsage } from '.'

export async function GuardianTextAction(
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, { schema: guardianTextSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const { api, text, score_threshold, type } = submission.value

  const count = await checkUsageCount()

  if (count >= 10) {
    submission.value.isLimitReached = true
    return {
      status: submission.status,
      value: submission.value,
    }
  }

  const result = await fetchApi(api, type, text, score_threshold)

  await incrementPlaygroundUsage()

  submission.value.result = JSON.stringify(result, null, 2)

  return {
    status: submission.status,
    value: submission.value,
  }
}
