import { SunshineTextDTO } from '@peace-net/shared/types/sunshine'
import { Context } from 'hono'

import { ISunshineUseCase } from '~/features/sunshines/sunshine.usecase'
import { sunshineLog } from '~/libs/logger'

export class SunshineController {
  constructor(private sunshineUseCase: ISunshineUseCase) {}

  async sunshineText(c: Context) {
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

    sunshineLog(c, 'INFO', {
      userId: userId,
      text: dto.text,
      result: result.value,
    })
    return c.json(result.value)
  }
}
