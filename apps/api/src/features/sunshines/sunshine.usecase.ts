import {
  SunshineResult,
  SunshineTextInput,
} from '@peace-net/shared/types/sunshine'
import { failure, success, type Result } from '@peace-net/shared/utils/result'

import { ISunshineService } from '~/features/sunshines/sunshine.service'
import { IUsageLogService } from '~/features/usageLogs/usageLog.service'
import { IUserPlanService } from '~/features/userPlans/userPlan.service'

export interface ISunshineUseCase {
  sunshineText(input: SunshineTextInput): Promise<Result<SunshineResult>>
}

export class SunshineUseCase implements ISunshineUseCase {
  constructor(
    private SunshineService: ISunshineService,
    private userPlanService: IUserPlanService,
    private usageLogService: IUsageLogService,
  ) {}

  async sunshineText(
    input: SunshineTextInput,
  ): Promise<Result<SunshineResult>> {
    try {
      const { text, userId, apiKeyId } = input
      const result = await this.SunshineService.sunshineText(text)

      // increment user plans total requests used
      await this.userPlanService.incrementTotalRequestsUsed(userId)

      // increment usage logs
      // update api keys last used
      await this.usageLogService.incrementUsageLog(apiKeyId, 'sunshines')

      return success({
        text: result.text,
      })
    } catch (error) {
      return failure(error)
    }
  }
}
