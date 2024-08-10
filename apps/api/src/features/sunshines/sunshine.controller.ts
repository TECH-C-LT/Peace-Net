import { SunshineTextDTO } from '@peace-net/shared/types/sunshine'
import { handleError } from '@peace-net/shared/utils/error-handler'
import { Context } from 'hono'

export class SunshineController {
  constructor() {}

  async sunshineText(c: Context) {
    try {
      const dto = (await c.req.json()) as SunshineTextDTO

      // TODO: useCaseを追加する。

      return c.json(dto)
    } catch (error) {
      return handleError(c, error)
    }
  }
}
