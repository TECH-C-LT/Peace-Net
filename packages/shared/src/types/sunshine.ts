import { z } from 'zod'
import { sunshineTextRequestSchema } from '../schemas/sunshine'

export type SunshineTextDTO = z.infer<typeof sunshineTextRequestSchema>
