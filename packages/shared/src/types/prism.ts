import { z } from 'zod'
import { prismResultSchema, prismTextRequestSchema } from '../schemas/prism'

export type PrismTextDTO = z.infer<typeof prismTextRequestSchema>

export type PrismTextInput = PrismTextDTO & {
  userId: string
  apiKeyId: string
}

export type PrismResult = z.infer<typeof prismResultSchema>
