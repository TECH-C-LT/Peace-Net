import { z } from 'zod'

export const modelsSchema = z.union([
  z.literal('gpt-4o-mini'),
  z.literal('claude-3-haiku'),
  z.literal('gemini-1.5-flash'),
  z.literal('llama-3.1'),
])
