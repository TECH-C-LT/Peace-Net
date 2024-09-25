import { modelsSchema } from '@peace-net/shared/schemas/model'
import { z } from 'zod'

export const guardianTextSchema = z.object({
  api: z.enum(['guardians'], {
    required_error: 'API is required',
  }),
  type: z.enum(['text'], {
    required_error: 'Type is required',
  }),
  text: z
    .string({ required_error: 'テキストは必須です' })
    .min(1, { message: 'テキストは1文字以上で入力してください' })
    .max(500, { message: 'テキストは500文字以下で入力してください' }),
  score_threshold: z.number().max(1).min(0.1).optional().default(0.5),
  model: modelsSchema.optional().default('gpt-4o-mini'),
  result: z.any().optional(),
  isLimitReached: z.boolean().optional(),
})

export type GuardianText = z.infer<typeof guardianTextSchema>

export const guardianImageSchema = z.object({
  api: z.enum(['guardians'], {
    required_error: 'API is required',
  }),
  type: z.enum(['image'], {
    required_error: 'Type is required',
  }),
  image: z.string({ required_error: '画像は必須です' }).refine((data) => {
    return data.startsWith('data:image/') && data.includes('base64,')
  }, '画像はBase64形式である必要があります'),
  score_threshold: z.number().max(1).min(0.1).optional().default(0.5),
  model: modelsSchema.optional().default('gpt-4o-mini'),
  result: z.any().optional(),
  isLimitReached: z.boolean().optional(),
})

export type GuardianImage = z.infer<typeof guardianTextSchema>
