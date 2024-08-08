import { zValidator } from '@hono/zod-validator'
import {
  guardianImageRequestSchema,
  guardianTextRequestSchema,
} from '@peace-net/shared/schemas/guardian'
import { handleError } from '@peace-net/shared/utils/error-handler'
import { Hono } from 'hono'

import { getEnv } from '~/config/environment'
import { GuardianController } from '~/features/guardians/guardian.controller'
import { GuardianService } from '~/features/guardians/guardian.service'
import { GuardianUseCase } from '~/features/guardians/guardian.usecase'
import { OpenAIClient } from '~/libs/openai'

/**
 * Guardian APIのルーティングを定義します
 * テキストと画像のコンテンツモデレーション用エンドポイントを提供
 * - POST /text: テキスト分析
 * - POST /image: 画像分析(未実装)
 */
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
