// src/features/guardians/guardian.utils.ts

import { Category } from '@peace-net/shared/types/guardian'

/**
 * カテゴリー別のスコアが指定されたスコア閾値以上であるかどうかを判定します
 *
 * @param categoryScores - カテゴリー別のスコア
 * @param scoreThreshold - スコア閾値
 * @returns カテゴリー別のスコアが指定されたスコア閾値以上であるかどうか
 */
export function checkFlagged(
  categoryScores: Record<string, number>,
  scoreThreshold: number,
): boolean {
  return Object.values(categoryScores).some((score) => score >= scoreThreshold)
}

/**
 * カテゴリー別のスコアからカテゴリー別の不適切な内容の有無を表すオブジェクトを生成します
 *
 * @param categoryScores - カテゴリー別のスコア
 * @param scoreThreshold - スコア閾値
 * @returns カテゴリー別の不適切な内容の有無を表すオブジェクト
 */
export function createCategories(
  categoryScores: Record<Category, number>,
  scoreThreshold: number,
): Record<Category, boolean> {
  return Object.fromEntries(
    Object.entries(categoryScores).map(([category, score]) => [
      category,
      score >= scoreThreshold,
    ]),
  ) as Record<Category, boolean>
}
