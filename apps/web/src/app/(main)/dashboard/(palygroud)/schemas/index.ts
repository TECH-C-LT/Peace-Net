import { z } from 'zod'

export const playgroundSchema = z.object({
  api: z.enum(['guardians', 'sunshines'], {
    required_error: 'API is required',
  }),
  type: z.enum(['text', 'image'], {
    required_error: 'Type is required',
  }),
})

export type Playground = z.infer<typeof playgroundSchema>
