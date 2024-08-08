import { z } from 'zod'

export const generateApiKeySchema = z.object({
  name: z.string({ required_error: '名前は必須です' }),
  expires_at: z
    .date({
      required_error: '有効期限は必須です',
    })
    .min(new Date(), '有効期限は明日以降の日付を指定してください'),
  api_key: z.string().optional(),
})

export type GenerateApiKey = z.infer<typeof generateApiKeySchema>
