import { zValidator } from '@hono/zod-validator'
import {
  guardianImageRequestSchema,
  guardianTextRequestSchema,
} from '@peace-net/shared/schemas/guardian'
import { handleError } from '@peace-net/shared/utils/error-handler'
import { Hono } from 'hono'

import { getEnv } from '~/config/environment'
import { OpenAIClient } from '~/libs/openai'

import { GuardianController } from './guardian.controller'
import { GuardianService } from './guardian.service'
import { GuardianUseCase } from './guardian.usecase'

const guardianRoutes = new Hono()

guardianRoutes.post(
  '/text',
  zValidator('json', guardianTextRequestSchema, (result, c) => {
    if (!result.success) {
      return handleError(c, result.error)
    }
    return
  }),
  async (c) => {
    return new GuardianController(
      new GuardianUseCase(
        new GuardianService(OpenAIClient(getEnv(c).OPENAI_API_KEY)),
      ),
    ).guardianText(c)
  },
)

guardianRoutes.post(
  '/image',
  zValidator('json', guardianImageRequestSchema, (result, c) => {
    if (!result.success) {
      return handleError(c, result.error)
    }
    return
  }),
  async (c) => {
    return new GuardianController(
      new GuardianUseCase(
        new GuardianService(OpenAIClient(getEnv(c).OPENAI_API_KEY)),
      ),
    ).guardianImage(c)
  },
)

export { guardianRoutes }
