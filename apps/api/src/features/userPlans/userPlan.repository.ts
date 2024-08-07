import { Database } from '@peace-net/shared/types/database'
import type { SupabaseClient } from '@supabase/supabase-js'

import { UserPlanWithPlans } from '~/features/userPlans/userPlan.type'

export interface IUserPlanRepository {
  getUserPlan: (userId: string) => Promise<UserPlanWithPlans | null>
  incrementTotalRequestsUsed: (userId: string) => Promise<void>
}

export class UserPlanRepository implements IUserPlanRepository {
  constructor(private supabase: SupabaseClient<Database>) {}

  async getUserPlan(userId: string) {
    const { data, error } = await this.supabase
      .from('user_plans')
      .select(
        `
      *,
      plans (
        id,
        total_request_limit
      )
    `,
      )
      .eq('user_id', userId)
      .single()

    if (error) {
      return null
    }

    return data || null
  }

  async incrementTotalRequestsUsed(userId: string) {
    const { error } = await (this.supabase.rpc as any)(
      'increment_total_requests_used',
      {
        p_user_id: userId,
      },
    )

    if (error) {
      throw new Error('Failed to increment total requests used')
    }
  }
}
