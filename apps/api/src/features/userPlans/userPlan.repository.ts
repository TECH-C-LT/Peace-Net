import { Database } from '@peace-net/shared/types/database'
import type { SupabaseClient } from '@supabase/supabase-js'

import { UserPlanWithPlans } from '~/features/userPlans/userPlan.type'

export interface IUserPlanRepository {
  getUserPlan: (userId: string) => Promise<UserPlanWithPlans | null>
}

export class UserPlanRepository implements IUserPlanRepository {
  constructor(private supabase: SupabaseClient<Database>) {}

  async getUserPlan(userId: string) {
    console.log('get user plan userId:', userId)

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
}
