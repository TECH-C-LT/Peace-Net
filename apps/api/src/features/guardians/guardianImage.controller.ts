import { GuardianImageDTO } from '@peace-net/shared/types/guardian'
import { Context } from 'hono'

import { guardianLog } from '~/libs/logger'

import { IGuardianImageUseCase } from './guardianImage.usecase'

/**
 * 画像の不適切な内容を分析し、カテゴリー別のスコアを提供するコントローラー
 *
 * このコントローラーは、GuardianUseCaseを使用してテキストの不適切な内容を分析し、結果をクライアントに返します。
 *
 * @class GuardianImageController
 * @method guardianImage - 指定された画像を分析し、不適切な内容の有無を判定します
 * @param guardianImageUseCase - GuardianUseCaseのインスタンス
 * @returns 分析結果を含むJSONレスポンス
 * @throws エラーが発生した場合はエラーレスポンスを返します
 */
export class GuardianImageController {
  constructor(private guardianImageUseCase: IGuardianImageUseCase) {}

  async guardianImage(c: Context) {
    const dto = (await c.req.json()) as GuardianImageDTO

    const userId = c.get('userId') as string
    const apiKeyId = c.get('apiKeyId') as string
    const result = await this.guardianImageUseCase.guardianImage({
      ...dto,
      userId,
      apiKeyId,
    })

    if (!result.ok) {
      throw result.error
    }

    guardianLog(c, 'INFO', {
      userId: userId,
      image: dto.image,
      score_threshold: dto.score_threshold,
      result: result.value,
    })
    return c.json(result.value)
  }
}
