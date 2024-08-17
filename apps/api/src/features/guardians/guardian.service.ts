import { AnthropicProvider } from '@ai-sdk/anthropic'
import { GoogleGenerativeAIProvider } from '@ai-sdk/google'
import { OpenAIProvider } from '@ai-sdk/openai'
import { InternalServerError } from '@peace-net/shared/core/error'
import { categoryScoresSchema } from '@peace-net/shared/schemas/guardian'
import type { CategoryScores, Models } from '@peace-net/shared/types/guardian'
import { generateObject } from 'ai'
import { z } from 'zod'

const systemPrompt = `
# 役割
あなたは日本語のコンテンツモデレーションの専門家です。
与えられたテキストを分析し、誹謗中傷や不適切な内容のカテゴリーとその深刻度を0から1の範囲で評価してください。

# 判断基準
誹謗中傷の定義は、「根拠のない悪口」、「相手の人格を否定または攻撃する言い回し」です。
- 人格攻撃の有無が判断基準です

不適切な文言は以下が含まれます。
- セクシャルハラスメント
  - 例: "おじさんとホテル行こうよ"
- ヘイト
  - 例: "サイヤ人は日本から出ていけ"
- 自傷的な文言
  - 例: "死にたいな"
- 暴力的な文言
  - 例: "東京でテロします"

## 注意点
以下に特に注意してください
1. 日本語特有の婉曲表現や隠語も考慮に入れてください。
2. 人格攻撃とみなされるかは、前後の文脈や状況、相手との関係性やタイミングによって意味が大きく変わる可能性がある言葉に注意してください。
3. 年齢や社会的立場によって受け取り方が異なる可能性のある表現を識別してください。
4. インターネットスラングや若者言葉の最新トレンドを考慮してください。
5. 文化的な文脈を踏まえ、日本社会での受け止められ方を反映させてください。

# 評価方法
各カテゴリーのスコアは以下のガイドラインに従って評価してください。
0.0: 問題なし
0.1-0.2: 批判の可能性ありまたは、受け手によって解釈が異なる
0.3-0.5: 軽度の懸念あり
0.6-0.8: 中程度の問題あり
0.9-1.0: 深刻な問題あり

カテゴリーごとのスコアを計算し、'category_scores'オブジェクトに格納してください。
`
// 与えられたテキストを英語で考えて、日本語で回答してください。

/**
 * テキストの不適切な内容を分析し、カテゴリー別のスコアを提供するサービスのインターフェース
 *
 * このサービスは、OpenAI APIを使用して日本語テキストのコンテンツモデレーションを行います。
 * 与えられたテキストを分析し、様々なカテゴリーにおける不適切さのスコアを0から1の範囲で評価します。
 *
 * @interface IGuardianService
 * @method guardianText - 指定されたテキストを分析し、不適切な内容の有無を判定します
 * @param text - 分析対象のテキスト
 * @returns 分析結果を含むResultオブジェクト。成功時はGuardianResultを、失敗時はエラーを含みます。
 */
export interface IGuardianService {
  guardianText(text: string, selectedModel: Models): Promise<CategoryScores>
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
export class GuardianService implements IGuardianService {
  constructor(
    private openai: OpenAIProvider,
    private anthropic: AnthropicProvider,
    private google: GoogleGenerativeAIProvider,
  ) {}

  async guardianText(
    text: string,
    selectedModel: Models,
  ): Promise<CategoryScores> {
    try {
      let model
      switch (selectedModel) {
        case 'gpt-4o-mini':
          model = this.openai('gpt-4o-mini')
          break
        case 'claude-3-haiku':
          model = this.anthropic('claude-3-haiku-20240307')
          break
        case 'gemini-1.5-flash':
          model = this.google('models/gemini-1.5-flash')
          break
        default:
          model = this.openai('gpt-4o-mini')
          break
      }

      const { object } = await generateObject({
        model,
        schema: z.object({ category_scores: categoryScoresSchema }),
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `分析するテキスト: ${text}` },
        ],
      })
      return object.category_scores
    } catch (error) {
      throw new InternalServerError('Failed to analyze text')
    }
  }
}
