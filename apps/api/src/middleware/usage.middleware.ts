import { UsageLimitExceededError } from '@peace-net/shared/core/error'
import { Context, Next } from 'hono'

import { getEnv } from '~/config/environment'
import { UsageUsecase } from '~/features/usages/usage.usecase'
import { UserPlanRepository } from '~/features/userPlans/userPlan.repository'
import { UserPlanService } from '~/features/userPlans/userPlan.service'
import { SupabaseClient } from '~/libs/supabase'

export const usageMiddleware = async (c: Context, next: Next) => {
  try {
    const userId = c.get('userId') as string

    const result = await new UsageUsecase(
      new UserPlanService(
        new UserPlanRepository(
          SupabaseClient(
            getEnv(c).SUPABASE_URL,
            getEnv(c).SUPABASE_SERVICE_ROLE_KEY,
          ),
        ),
      ),
    ).checkUsage({ userId })

    if (!result.ok) {
      throw new UsageLimitExceededError(result.error.message)
    }

    return next()
  } catch (error: any) {
    throw new UsageLimitExceededError(error.message)
  }
}
