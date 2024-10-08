import { z } from 'zod'
import { modelsSchema } from './model'

export const categoryScoresSchema = z.object({
  sexual: z.number(),
  hate: z.number(),
  self_harm: z.number(),
  violence: z.number(),
  defamation: z.number(),
})

export const guardianTextRequestSchema = z.object({
  text: z.string().max(500),
  score_threshold: z.number().max(1).min(0.1).optional().default(0.5),
  model: modelsSchema.optional().default('gpt-4o-mini'),
})

export const guardianImageRequestSchema = z.object({
  image: z.string(),
  score_threshold: z.number().max(1).min(0).optional().default(0.5),
})

export const guardianResultSchema = z.object({
  flagged: z.boolean(),
  categories: z.record(z.boolean()),
  category_scores: categoryScoresSchema,
})
