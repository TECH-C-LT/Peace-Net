import {
  UnauthorizedError,
  UsageLimitExceededError,
} from '@peace-net/shared/core/error'
import { failure, Result, success } from '@peace-net/shared/utils/result'

import { CheckUsageInput, CheckUsageOutput } from '~/features/usages/usage.type'
import { IUserPlanService } from '~/features/userPlans/userPlan.service'

export interface IUsageUsecase {
  checkUsage(input: CheckUsageInput): Promise<Result<CheckUsageOutput>>
}

export class UsageUsecase implements IUsageUsecase {
  constructor(private userPlanService: IUserPlanService) {}

  async checkUsage(input: CheckUsageInput): Promise<Result<CheckUsageOutput>> {
    const { userId } = input

    try {
      // ユーザーのプラン情報を取得
      const userPlan = await this.userPlanService.getUserPlan(userId)

      if (!userPlan) {
        return failure(new UnauthorizedError('User plan not found'))
      }

      // リクエスト数が制限を超えている場合はエラーを返す
      if (
        userPlan.total_requests_used !== null &&
        userPlan.total_requests_used >=
          (userPlan.plans?.total_request_limit ?? 0)
      ) {
        return failure(
          new UsageLimitExceededError("User plan's usage limit exceeded"),
        )
      }

      return success({
        isValid: true,
        totalRequestsUsed: userPlan.total_requests_used ?? 0,
      })
    } catch (error: any) {
      return failure(error)
    }
  }
}
