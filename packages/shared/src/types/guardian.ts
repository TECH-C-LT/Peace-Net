import { z } from 'zod'
import {
  categoryScoresSchema,
  guardianTextRequestSchema,
  guardianImageRequestSchema,
  guardianResultSchema,
} from '../schemas/guardian'

export type Category = keyof z.infer<typeof categoryScoresSchema>

export type CategoryScores = z.infer<typeof categoryScoresSchema>

export type GuardianTextDTO = z.infer<typeof guardianTextRequestSchema>

export type GuardianTextInput = GuardianTextDTO & {
  userId: string
  totalRequestsUsed: number
  apiKeyId: string
}

export type GuardianImageDTO = z.infer<typeof guardianImageRequestSchema>

export type GuardianResult = z.infer<typeof guardianResultSchema>
