import { zValidator } from '@hono/zod-validator'
import { prismTextRequestSchema } from '@peace-net/shared/schemas/prism'
import { handleError } from '@peace-net/shared/utils/error-handler'
import { Hono } from 'hono'

import { getEnv } from '~/config/environment'
import { PrismController } from '~/features/prisms/prism.controller'
import { PrismService } from '~/features/prisms/prism.service'
import { PrismUseCase } from '~/features/prisms/prism.usecase'
import { UsageLogRepository } from '~/features/usageLogs/usageLog.repository'
import { UsageLogService } from '~/features/usageLogs/usageLog.service'
import { UsageFacade } from '~/features/usages/usage.facade'
import { UserPlanRepository } from '~/features/userPlans/userPlan.repository'
import { UserPlanService } from '~/features/userPlans/userPlan.service'
import { AnthropicClient, GoogleClient, OpenAIClient } from '~/libs/models'
import { SupabaseClient } from '~/libs/supabase'

/**
 * Prism APIのルーティングを定義します
 * - POST /text: テキスト変換
 */
const prismRoutes = new Hono()

prismRoutes.post(
  '/text',
  zValidator('json', prismTextRequestSchema, (result, c) => {
    if (!result.success) {
      return handleError(c, result.error)
    }
    return
  }),
  async (c) => {
    return new PrismController(
      new PrismUseCase(
        new PrismService(
          OpenAIClient(getEnv(c).OPENAI_API_KEY),
          AnthropicClient(getEnv(c).ANTHROPIC_API_KEY),
          GoogleClient(getEnv(c).GOOGLE_API_KEY),
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
    ).prismText(c)
  },
)

export { prismRoutes }
