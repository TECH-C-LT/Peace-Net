import { z } from 'zod'

export const playgroundSchema = z.object({
  api: z.enum(['guardians', 'sunshines'], {
    required_error: 'API is required',
  }),
  text: z
    .string({ required_error: 'テキストは必須です' })
    .min(1, { message: 'テキストは1文字以上で入力してください' }),
  result: z.any().optional(),
})

export type Playground = z.infer<typeof playgroundSchema>
