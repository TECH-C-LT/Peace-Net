import { NotImplementedError } from '@peace-net/shared/core/error'
import { GuardianTextDTO } from '@peace-net/shared/types/guardian'
import { handleError } from '@peace-net/shared/utils/error-handler'
import { Context } from 'hono'

import { IGuardianUseCase } from './guardian.usecase'

export class GuardianController {
  constructor(private guardianUseCase: IGuardianUseCase) {}

  async guardianText(c: Context) {
    try {
      const dto = (await c.req.json()) as GuardianTextDTO

      const result = await this.guardianUseCase.guardianText(dto)

      if (!result.ok) {
        throw result.error
      }

      return c.json(result.value)
    } catch (error) {
      return handleError(c, error)
    }
  }

  async guardianImage(c: Context) {
    try {
      throw new NotImplementedError(
        'Guardian API image analysis is not implemented yet',
      )
    } catch (error) {
      return handleError(c, error)
    }
  }
}
