import { PrismResult, PrismTextInput } from '@peace-net/shared/types/prism'
import { failure, success, type Result } from '@peace-net/shared/utils/result'

import { IPrismService } from '~/features/prisms/prism.service'
import { IUsageFacade } from '~/features/usages/usage.facade'

export interface IPrismUseCase {
  prismText(input: PrismTextInput): Promise<Result<PrismResult>>
}

export class PrismUseCase implements IPrismUseCase {
  constructor(
    private PrismService: IPrismService,
    private usageFacade: IUsageFacade,
  ) {}

  async prismText(input: PrismTextInput): Promise<Result<PrismResult>> {
    try {
      const { text, model, userId, apiKeyId } = input
      const result = await this.PrismService.prismText(text, model)

      await this.usageFacade.incrementUsage(userId, apiKeyId, 'prisms')

      return success({
        ...result,
      })
    } catch (error) {
      return failure(error)
    }
  }
}
