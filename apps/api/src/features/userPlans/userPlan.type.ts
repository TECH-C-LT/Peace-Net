import { UserPlan } from '@peace-net/shared/types/entities'

export type UserPlanWithPlans = UserPlan & {
  plans: {
    id: string
    total_request_limit: number
  } | null
}
