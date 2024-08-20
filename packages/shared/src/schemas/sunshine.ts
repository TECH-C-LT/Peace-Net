import { z } from 'zod'
import { modelsSchema } from './model'

export const sunshineTextRequestSchema = z.object({
  text: z.string().max(500),
  model: modelsSchema.optional().default('gpt-4o-mini'),
})

export const sunshineResultSchema = z.object({
  text: z.string(),
})
