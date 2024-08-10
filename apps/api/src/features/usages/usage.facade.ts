import { IUsageLogService } from '~/features/usageLogs/usageLog.service'
import { IUserPlanService } from '~/features/userPlans/userPlan.service'

export interface IUsageFacade {
  incrementUsage(
    userId: string,
    apiKeyId: string,
    feature: 'guardians' | 'sunshines',
  ): Promise<void>
}

export class UsageFacade implements IUsageFacade {
  constructor(
    private userPlanService: IUserPlanService,
    private usageLogService: IUsageLogService,
  ) {}

  async incrementUsage(
    userId: string,
    apiKeyId: string,
    feature: 'guardians' | 'sunshines',
  ): Promise<void> {
    await Promise.all([
      this.userPlanService.incrementTotalRequestsUsed(userId),
      this.usageLogService.incrementUsageLog(apiKeyId, feature),
    ])
  }
}
