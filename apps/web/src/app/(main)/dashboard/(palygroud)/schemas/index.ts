import { z } from 'zod'

export const playgroundSchema = z.object({
  api: z.enum(['guardians', 'sunshines'], {
    required_error: 'API is required',
  }),
  text: z
    .string({ required_error: 'テキストは必須です' })
    .min(1, { message: 'テキストは1文字以上で入力してください' })
    .max(500, { message: 'テキストは500文字以下で入力してください' }),
  score_threshold: z.number().max(1).min(0).optional().default(0.5),
  result: z.any().optional(),
})

export type Playground = z.infer<typeof playgroundSchema>
