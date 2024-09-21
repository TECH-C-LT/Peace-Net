import {
  GuardianImageInput,
  GuardianResult,
} from '@peace-net/shared/types/guardian'
import { failure, success, type Result } from '@peace-net/shared/utils/result'

import {
  checkFlagged,
  createCategories,
} from '~/features/guardians/guardian.utils'
import { IGuardianImageService } from '~/features/guardians/guardianImage.service'
import { IUsageFacade } from '~/features/usages/usage.facade'

/**
 * テキストの不適切な内容を分析し、カテゴリー別のスコアを提供するユースケースのインターフェース
 *
 * このユースケースは、GuardianServiceを使用してテキストの不適切な内容を分析し、指定されたスコア閾値を超えるかどうかを判定します。
 * また、使用回数をカウントします。
 *
 * @interface IGuardianImageUseCase
 * @method guardianText - 指定されたテキストを分析し、不適切な内容の有無を判定します
 * @param dto - 分析対象のテキストとスコア閾値
 * @returns 分析結果を含むResultオブジェクト。成功時はGuardianResultを、失敗時はエラーを含みます。
 */
export interface IGuardianImageUseCase {
  guardianImage(input: GuardianImageInput): Promise<Result<GuardianResult>>
}

/**
 * テキストの不適切な内容を分析し、カテゴリー別のスコアを提供するユースケース
 *
 * このユースケースは、GuardianServiceを使用してテキストの不適切な内容を分析し、指定されたスコア閾値を超えるかどうかを判定します。
 * また、使用回数をカウントします。
 *
 * @class GuardianImageUseCase
 * @implements IGuardianImageUseCase
 * @param guardianImageService - GuardianServiceのインスタンス
 * @method guardianImage - 指定されたテキストを分析し、不適切な内容の有無を判定します
 * @returns 分析結果を含むResultオブジェクト。成功時はGuardianResultを、失敗時はエラーを含みます。
 */
export class GuardianImageUseCase implements IGuardianImageUseCase {
  constructor(
    private guardianImageService: IGuardianImageService,
    private usageFacade: IUsageFacade,
  ) {}

  async guardianImage(
    input: GuardianImageInput,
  ): Promise<Result<GuardianResult>> {
    try {
      const { image, score_threshold = 0.5, userId, apiKeyId } = input

      const categoryScores =
        await this.guardianImageService.guardianImage(image)

      const flagged = checkFlagged(categoryScores, score_threshold)

      const categories = createCategories(categoryScores, score_threshold)

      await this.usageFacade.incrementUsage(userId, apiKeyId, 'guardians')

      return success({
        flagged,
        categories,
        category_scores: categoryScores,
      })
    } catch (error) {
      return failure(error)
    }
  }
}
