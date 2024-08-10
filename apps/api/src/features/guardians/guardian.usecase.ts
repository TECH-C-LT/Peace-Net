import {
  GuardianResult,
  GuardianTextInput,
} from '@peace-net/shared/types/guardian'
import { failure, success, type Result } from '@peace-net/shared/utils/result'

import { IGuardianService } from '~/features/guardians/guardian.service'
import {
  checkFlagged,
  createCategories,
} from '~/features/guardians/guardian.utils'
import { IUsageFacade } from '~/features/usages/usage.facade'

/**
 * テキストの不適切な内容を分析し、カテゴリー別のスコアを提供するユースケースのインターフェース
 *
 * このユースケースは、GuardianServiceを使用してテキストの不適切な内容を分析し、指定されたスコア閾値を超えるかどうかを判定します。
 * また、使用回数をカウントします。
 *
 * @interface IGuardianUseCase
 * @method guardianText - 指定されたテキストを分析し、不適切な内容の有無を判定します
 * @param dto - 分析対象のテキストとスコア閾値
 * @returns 分析結果を含むResultオブジェクト。成功時はGuardianResultを、失敗時はエラーを含みます。
 */
export interface IGuardianUseCase {
  guardianText(input: GuardianTextInput): Promise<Result<GuardianResult>>
}

/**
 * テキストの不適切な内容を分析し、カテゴリー別のスコアを提供するユースケース
 *
 * このユースケースは、GuardianServiceを使用してテキストの不適切な内容を分析し、指定されたスコア閾値を超えるかどうかを判定します。
 * また、使用回数をカウントします。
 *
 * @class GuardianUseCase
 * @implements IGuardianUseCase
 * @param guardianService - GuardianServiceのインスタンス
 * @method guardianText - 指定されたテキストを分析し、不適切な内容の有無を判定します
 * @returns 分析結果を含むResultオブジェクト。成功時はGuardianResultを、失敗時はエラーを含みます。
 */
export class GuardianUseCase implements IGuardianUseCase {
  constructor(
    private guardianService: IGuardianService,
    private usageFacade: IUsageFacade,
  ) {}

  async guardianText(
    input: GuardianTextInput,
  ): Promise<Result<GuardianResult>> {
    try {
      const { text, score_threshold, userId, apiKeyId } = input
      const categoryScores = await this.guardianService.guardianText(text)

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
