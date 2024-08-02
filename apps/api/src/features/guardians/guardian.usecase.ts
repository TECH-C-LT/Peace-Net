import {
  Category,
  GuardianResult,
  GuardianTextDTO,
} from '@peace-net/shared/types/guardian'
import { failure, success, type Result } from '@peace-net/shared/utils/result'

import { IGuardianService } from './guardian.service'

export interface IGuardianUseCase {
  guardianText(dto: GuardianTextDTO): Promise<Result<GuardianResult>>
}

export class GuardianUseCase implements IGuardianUseCase {
  constructor(private guardianService: IGuardianService) {}

  async guardianText(dto: GuardianTextDTO): Promise<Result<GuardianResult>> {
    try {
      const { text, score_threshold } = dto
      const categoryScores = await this.guardianService.guardianText(text)

      const flagged = Object.values(categoryScores).some(
        (score) => score >= score_threshold,
      )

      const categories = Object.fromEntries(
        Object.entries(categoryScores).map(([category, score]) => [
          category as Category,
          score >= score_threshold,
        ]),
      )

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
