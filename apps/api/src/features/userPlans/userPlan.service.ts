import { IUserPlanRepository } from '~/features/userPlans/userPlan.repository'
import { UserPlanWithPlans } from '~/features/userPlans/userPlan.type'

export interface IUserPlanService {
  getUserPlan: (userId: string) => Promise<UserPlanWithPlans | null>
}

export class UserPlanService implements IUserPlanService {
  constructor(private userPlanRepository: IUserPlanRepository) {}

  async getUserPlan(userId: string) {
    const userPlan = await this.userPlanRepository.getUserPlan(userId)

    return userPlan
  }
}
