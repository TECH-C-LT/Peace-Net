import { NotImplementedError } from '@peace-net/shared/core/error'
import { GuardianTextDTO } from '@peace-net/shared/types/guardian'
import { handleError } from '@peace-net/shared/utils/error-handler'
import { Context } from 'hono'

import { IGuardianUseCase } from '~/features/guardians/guardian.usecase'

/**
 * テキストの不適切な内容を分析し、カテゴリー別のスコアを提供するコントローラー
 *
 * このコントローラーは、GuardianUseCaseを使用してテキストの不適切な内容を分析し、結果をクライアントに返します。
 *
 * @class GuardianController
 * @method guardianText - 指定されたテキストを分析し、不適切な内容の有無を判定します
 * @method guardianImage - 指定された画像を分析し、不適切な内容の有無を判定します
 * @param guardianUseCase - GuardianUseCaseのインスタンス
 * @returns 分析結果を含むJSONレスポンス
 * @throws エラーが発生した場合はエラーレスポンスを返します
 */
export class GuardianController {
  constructor(private guardianUseCase: IGuardianUseCase) {}

  async guardianText(c: Context) {
    try {
      const dto = (await c.req.json()) as GuardianTextDTO

      const userId = c.get('userId') as string
      const apiKeyId = c.get('apiKeyId') as string

      const result = await this.guardianUseCase.guardianText({
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
