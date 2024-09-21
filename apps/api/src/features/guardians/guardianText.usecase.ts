import {
  GuardianResult,
  GuardianTextInput,
} from '@peace-net/shared/types/guardian'
import { failure, success, type Result } from '@peace-net/shared/utils/result'

import {
  checkFlagged,
  createCategories,
} from '~/features/guardians/guardian.utils'
import { IGuardianTextService } from '~/features/guardians/guardianText.service'
import { IUsageFacade } from '~/features/usages/usage.facade'

/**
 * テキストの不適切な内容を分析し、カテゴリー別のスコアを提供するユースケースのインターフェース
 *
 * このユースケースは、GuardianServiceを使用してテキストの不適切な内容を分析し、指定されたスコア閾値を超えるかどうかを判定します。
 * また、使用回数をカウントします。
 *
 * @interface IGuardianTextUseCase
 * @method guardianText - 指定されたテキストを分析し、不適切な内容の有無を判定します
 * @param dto - 分析対象のテキストとスコア閾値
 * @returns 分析結果を含むResultオブジェクト。成功時はGuardianResultを、失敗時はエラーを含みます。
 */
export interface IGuardianTextUseCase {
  guardianText(input: GuardianTextInput): Promise<Result<GuardianResult>>
}

/**
 * テキストの不適切な内容を分析し、カテゴリー別のスコアを提供するユースケース
 *
 * このユースケースは、GuardianServiceを使用してテキストの不適切な内容を分析し、指定されたスコア閾値を超えるかどうかを判定します。
 * また、使用回数をカウントします。
 *
 * @class GuardianTextUseCase
 * @implements IGuardianTextUseCase
 * @param guardianService - GuardianServiceのインスタンス
 * @method guardianText - 指定されたテキストを分析し、不適切な内容の有無を判定します
 * @returns 分析結果を含むResultオブジェクト。成功時はGuardianResultを、失敗時はエラーを含みます。
 */
export class GuardianTextUseCase implements IGuardianTextUseCase {
  constructor(
    private guardianTextService: IGuardianTextService,
    private usageFacade: IUsageFacade,
  ) {}

  async guardianText(
    input: GuardianTextInput,
  ): Promise<Result<GuardianResult>> {
    try {
      const {
        text,
        score_threshold = 0.5,
        model = 'gpt-4o-mini',
        userId,
        apiKeyId,
      } = input

      const categoryScores = await this.guardianTextService.guardianText(
        text,
        model,
      )

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
