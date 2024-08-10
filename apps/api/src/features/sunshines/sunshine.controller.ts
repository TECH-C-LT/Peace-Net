import { SunshineTextDTO } from '@peace-net/shared/types/sunshine'
import { handleError } from '@peace-net/shared/utils/error-handler'
import { Context } from 'hono'

import { ISunshineUseCase } from '~/features/sunshines/sunshine.usecase'

export class SunshineController {
  constructor(private sunshineUseCase: ISunshineUseCase) {}

  async sunshineText(c: Context) {
    try {
      const dto = (await c.req.json()) as SunshineTextDTO

      const userId = c.get('userId') as string
      const apiKeyId = c.get('apiKeyId') as string

      const result = await this.sunshineUseCase.sunshineText({
        ...dto,
        userId,
        apiKeyId,
      })

      if (!result.ok) {
        throw result.error
      }

      return c.json(result.value)
    } catch (error) {
      return handleError(c, error)
    }
  }
}
