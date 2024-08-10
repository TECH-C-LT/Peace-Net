import { z } from 'zod'
import {
  sunshineResultSchema,
  sunshineTextRequestSchema,
} from '../schemas/sunshine'

export type SunshineTextDTO = z.infer<typeof sunshineTextRequestSchema>

export type SunshineTextInput = SunshineTextDTO & {
  userId: string
  apiKeyId: string
}

export type SunshineResult = z.infer<typeof sunshineResultSchema>
