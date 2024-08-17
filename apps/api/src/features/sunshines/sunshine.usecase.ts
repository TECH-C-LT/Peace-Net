import {
  SunshineResult,
  SunshineTextInput,
} from '@peace-net/shared/types/sunshine'
import { failure, success, type Result } from '@peace-net/shared/utils/result'

import { ISunshineService } from '~/features/sunshines/sunshine.service'
import { IUsageFacade } from '~/features/usages/usage.facade'

export interface ISunshineUseCase {
  sunshineText(input: SunshineTextInput): Promise<Result<SunshineResult>>
}

export class SunshineUseCase implements ISunshineUseCase {
  constructor(
    private SunshineService: ISunshineService,
    private usageFacade: IUsageFacade,
  ) {}

  async sunshineText(
    input: SunshineTextInput,
  ): Promise<Result<SunshineResult>> {
    try {
      const { text, model, userId, apiKeyId } = input
      const result = await this.SunshineService.sunshineText(text, model)

      await this.usageFacade.incrementUsage(userId, apiKeyId, 'sunshines')

      return success({
        text: result.text,
      })
    } catch (error) {
      return failure(error)
    }
  }
}
