import { PrismTextDTO } from '@peace-net/shared/types/prism'
import { Context } from 'hono'

import { IPrismUseCase } from '~/features/prisms/prism.usecase'

export class PrismController {
  constructor(private prismUseCase: IPrismUseCase) {}

  async prismText(c: Context) {
    const dto = (await c.req.json()) as PrismTextDTO

    const userId = c.get('userId') as string
    const apiKeyId = c.get('apiKeyId') as string

    const result = await this.prismUseCase.prismText({
      ...dto,
      userId,
      apiKeyId,
    })

    if (!result.ok) {
      throw result.error
    }

    return c.json(result.value)
  }
}
