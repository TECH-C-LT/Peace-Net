import { parseWithZod } from '@conform-to/zod'

import { guardianImageSchema } from '../schemas/guardian'
import { checkUsageCount, fetchApi, incrementPlaygroundUsage } from '.'

export async function GuardianImageAction(
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, { schema: guardianImageSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  console.log(submission.value)

  const { api, image, score_threshold, type } = submission.value

  const count = await checkUsageCount()

  if (count >= 10) {
    submission.value.isLimitReached = true
    return {
      status: submission.status,
      value: submission.value,
    }
  }

  const result = await fetchApi(api, type, image, score_threshold)

  await incrementPlaygroundUsage()

  submission.value.result = JSON.stringify(result, null, 2)

  return {
    status: submission.status,
    value: submission.value,
  }
}
