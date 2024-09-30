import { modelsSchema } from '@peace-net/shared/schemas/model'
import { z } from 'zod'

export const prismSchema = z.object({
  api: z.enum(['prisms'], {
    required_error: 'API is required',
  }),
  type: z.enum(['text'], {
    required_error: 'Type is required',
  }),
  text: z
    .string({ required_error: 'テキストは必須です' })
    .min(1, { message: 'テキストは1文字以上で入力してください' })
    .max(500, { message: 'テキストは500文字以下で入力してください' }),
  model: modelsSchema.optional().default('gpt-4o-mini'),
  result: z.any().optional(),
  isLimitReached: z.boolean().optional(),
})

export type Prism = z.infer<typeof prismSchema>
