import { z } from 'zod'
import { modelsSchema } from './model'

export const prismTextRequestSchema = z.object({
  text: z.string().max(500),
  model: modelsSchema.optional().default('gpt-4o-mini'),
})

export const prismResultSchema = z.object({
  positive: z.string(),
  negative: z.string(),
})
