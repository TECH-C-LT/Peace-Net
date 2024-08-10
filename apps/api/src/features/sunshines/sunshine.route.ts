import { zValidator } from '@hono/zod-validator'
import { sunshineTextRequestSchema } from '@peace-net/shared/schemas/sunshine'
import { handleError } from '@peace-net/shared/utils/error-handler'
import { Hono } from 'hono'

import { getEnv } from '~/config/environment'
import { SunshineController } from '~/features/sunshines/sunshine.controller'
import { SunshineService } from '~/features/sunshines/sunshine.service'
import { SunshineUseCase } from '~/features/sunshines/sunshine.usecase'
import { UsageLogRepository } from '~/features/usageLogs/usageLog.repository'
import { UsageLogService } from '~/features/usageLogs/usageLog.service'
import { UsageFacade } from '~/features/usages/usage.facade'
import { UserPlanRepository } from '~/features/userPlans/userPlan.repository'
import { UserPlanService } from '~/features/userPlans/userPlan.service'
import { OpenAIClient } from '~/libs/openai'
import { SupabaseClient } from '~/libs/supabase'

/**
 * Sunshine APIのルーティングを定義します
 * ネガティブなテキストをポジティブなテキストに変換するエンドポイントを提供
 * - POST /text: テキスト変換
 */
const sunshineRoutes = new Hono()

sunshineRoutes.post(
  '/text',
  zValidator('json', sunshineTextRequestSchema, (result, c) => {
    if (!result.success) {
      return handleError(c, result.error)
    }
    return
  }),
  async (c) => {
    return new SunshineController(
      new SunshineUseCase(
        new SunshineService(OpenAIClient(getEnv(c).OPENAI_API_KEY)),
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
    ).sunshineText(c)
  },
)

export { sunshineRoutes }
