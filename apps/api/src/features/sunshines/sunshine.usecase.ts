import {
  SunshineResult,
  SunshineTextInput,
} from '@peace-net/shared/types/sunshine'
import { failure, success, type Result } from '@peace-net/shared/utils/result'

import { ISunshineService } from '~/features/sunshines/sunshine.service'

export interface ISunshineUseCase {
  sunshineText(input: SunshineTextInput): Promise<Result<SunshineResult>>
}

export class SunshineUseCase implements ISunshineUseCase {
  constructor(private SunshineService: ISunshineService) {}

  async sunshineText(
    input: SunshineTextInput,
  ): Promise<Result<SunshineResult>> {
    try {
      const { text } = input
      const result = await this.SunshineService.sunshineText(text)

      // TODO: increment user plans total requests used
      // await this.userPlanService.incrementTotalRequestsUsed(userId)

      // TODO: increment usage logs
      // TODO: update api keys last used
      // await this.usageLogService.incrementUsageLog(apiKeyId, 'guardians')

      return success({
        text: result.text,
      })
    } catch (error) {
      return failure(error)
    }
  }
}
