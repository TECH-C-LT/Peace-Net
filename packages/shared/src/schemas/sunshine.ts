import { z } from 'zod'

export const sunshineTextRequestSchema = z.object({
  text: z.string().max(500),
})

export const sunshineResultSchema = z.object({
  text: z.string(),
})
