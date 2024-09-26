import { OpenAIProvider } from '@ai-sdk/openai'
import { InternalServerError } from '@peace-net/shared/core/error'
import { categoryScoresSchema } from '@peace-net/shared/schemas/guardian'
import type { CategoryScores } from '@peace-net/shared/types/guardian'
import { generateObject } from 'ai'
import { z } from 'zod'

const systemPrompt = `
# 役割
あなたは画像コンテンツモデレーションの専門家です。
与えられた画像を分析し、不適切な内容のカテゴリーとその深刻度を0から1の範囲で評価してください。

## 注意点
以下に特に注意してください
1. 画像内の細かいディテールや暗示的な表現にも注意してください。隠された意味や背景の文脈を考慮に入れてください。
2. 文化的な文脈や社会的背景を考慮し、日本社会における受け止められ方を反映してください。
3. 画像の内容が年齢や社会的立場によって異なる解釈を引き起こす場合、それも考慮してください。

# 評価方法
各カテゴリーのスコアは以下のガイドラインに従って評価してください。
0.0: 問題なし
0.1-0.2: 軽度の懸念あり
0.3-0.5: 受け手によっては不快または問題があると感じられる可能性あり
0.6-0.8: 中程度の有害性があり、問題視される可能性が高い
0.9-1.0: 深刻な有害性があり、強い懸念や行動が必要な状態

カテゴリーごとのスコアを計算し、'category_scores'オブジェクトに格納してください。
`
// 与えられたテキストを英語で考えて、日本語で回答してください。

/**
 * テキストの不適切な内容を分析し、カテゴリー別のスコアを提供するサービスのインターフェース
 *
 * このサービスは、OpenAI APIを使用して日本語テキストのコンテンツモデレーションを行います。
 * 与えられたテキストを分析し、様々なカテゴリーにおける不適切さのスコアを0から1の範囲で評価します。
 *
 * @interface IGuardianImageService
 * @method guardianImage - 指定されたテキストを分析し、不適切な内容の有無を判定します
 * @param image - 分析対象の画像(Base64形式)
 * @returns 分析結果を含むResultオブジェクト。成功時はGuardianResultを、失敗時はエラーを含みます。
 */
export interface IGuardianImageService {
  guardianImage(image: string): Promise<CategoryScores>
}

/**
 * テキストの不適切な内容を分析し、カテゴリー別のスコアを提供するサービスの実装
 *
 * このサービスは、OpenAI APIを使用して日本語テキストのコンテンツモデレーションを行います。
 * 与えられたテキストを分析し、様々なカテゴリーにおける不適切さのスコアを0から1の範囲で評価します。
 *
 * @class GuardianService
 * @implements IGuardianService
 * @param openai - OpenAIProviderのインスタンス
 * @method guardianText - 指定されたテキストを分析し、不適切な内容の有無を判定します
 * @returns 分析結果を含むResultオブジェクト。成功時はGuardianResultを、失敗時はエラーを含みます。
 */
export class GuardianImageService implements IGuardianImageService {
  constructor(private openai: OpenAIProvider) {}

  async guardianImage(image: string): Promise<CategoryScores> {
    try {
      const { object } = await generateObject({
        model: this.openai('gpt-4o-mini'),
        schema: z.object({ category_scores: categoryScoresSchema }),
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: [{ type: 'image', image }],
          },
        ],
      })
      return object.category_scores
    } catch (error) {
      console.error(error)
      throw new InternalServerError('Failed to analyze image')
    }
  }
}
