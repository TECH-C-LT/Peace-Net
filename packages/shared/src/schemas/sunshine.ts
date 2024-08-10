import { z } from 'zod'

export const sunshineTextRequestSchema = z.object({
  text: z.string().max(500),
})
