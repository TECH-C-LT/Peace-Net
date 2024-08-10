import {
  SunshineResult,
  SunshineTextInput,
} from '@peace-net/shared/types/sunshine'
import { failure, success, type Result } from '@peace-net/shared/utils/result'

export interface ISunshineUseCase {
  sunshineText(input: SunshineTextInput): Promise<Result<SunshineResult>>
}

export class SunshineUseCase implements ISunshineUseCase {
  constructor() {}

  async sunshineText(
    input: SunshineTextInput,
  ): Promise<Result<SunshineResult>> {
    try {
      const { text } = input
      // TODO serviceを追加する

      // TODO: increment user plans total requests used
      // await this.userPlanService.incrementTotalRequestsUsed(userId)

      // TODO: increment usage logs
      // TODO: update api keys last used
      // await this.usageLogService.incrementUsageLog(apiKeyId, 'guardians')

      return success({
        text: 'Sunshine: ' + text,
      })
    } catch (error) {
      return failure(error)
    }
  }
}
