import { zValidator } from '@hono/zod-validator'
import {
  guardianImageRequestSchema,
  guardianTextRequestSchema,
} from '@peace-net/shared/schemas/guardian'
import { handleError } from '@peace-net/shared/utils/error-handler'
import { Hono } from 'hono'

import { getEnv } from '~/config/environment'
import { UsageLogRepository } from '~/features/usageLogs/usageLog.repository'
import { UsageLogService } from '~/features/usageLogs/usageLog.service'
import { UsageFacade } from '~/features/usages/usage.facade'
import { UserPlanRepository } from '~/features/userPlans/userPlan.repository'
import { UserPlanService } from '~/features/userPlans/userPlan.service'
import {
  AnthropicClient,
  GoogleClient,
  GroqClient,
  OpenAIClient,
} from '~/libs/models'
import { SupabaseClient } from '~/libs/supabase'

import { GuardianImageController } from './guardianImage.controller'
import { GuardianImageService } from './guardianImage.service'
import { GuardianImageUseCase } from './guardianImage.usecase'
import { GuardianTextController } from './guardianText.controller'
import { GuardianTextService } from './guardianText.service'
import { GuardianTextUseCase } from './guardianText.usecase'

/**
 * Guardian APIのルーティングを定義します
 * テキストと画像のコンテンツモデレーション用エンドポイントを提供
 * - POST /text: テキスト分析
 * - POST /image: 画像分析
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
    return new GuardianTextController(
      new GuardianTextUseCase(
        new GuardianTextService(
          OpenAIClient(getEnv(c).OPENAI_API_KEY),
          AnthropicClient(getEnv(c).ANTHROPIC_API_KEY),
          GoogleClient(getEnv(c).GOOGLE_API_KEY),
          GroqClient(getEnv(c).GROQ_API_KEY),
        ),
        new UsageFacade(
          new UserPlanService(
            new UserPlanRepository(
              SupabaseClient(
                getEnv(c).SUPABASE_URL,
                getEnv(c).SUPABASE_SERVICE_ROLE_KEY,
              ),
            ),
          ),
          new UsageLogService(
            new UsageLogRepository(
              SupabaseClient(
                getEnv(c).SUPABASE_URL,
                getEnv(c).SUPABASE_SERVICE_ROLE_KEY,
              ),
            ),
          ),
        ),
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
    return new GuardianImageController(
      new GuardianImageUseCase(
        new GuardianImageService(OpenAIClient(getEnv(c).OPENAI_API_KEY)),
        new UsageFacade(
          new UserPlanService(
            new UserPlanRepository(
              SupabaseClient(
                getEnv(c).SUPABASE_URL,
                getEnv(c).SUPABASE_SERVICE_ROLE_KEY,
              ),
            ),
          ),
          new UsageLogService(
            new UsageLogRepository(
              SupabaseClient(
                getEnv(c).SUPABASE_URL,
                getEnv(c).SUPABASE_SERVICE_ROLE_KEY,
              ),
            ),
          ),
        ),
      ),
    ).guardianImage(c)
  },
)

export { guardianRoutes }
