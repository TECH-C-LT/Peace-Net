import { OpenAIProvider } from '@ai-sdk/openai'
import { categoryScoresSchema } from '@peace-net/shared/schemas/guardian'
import type { CategoryScores } from '@peace-net/shared/types/guardian'
import { generateObject } from 'ai'
import { z } from 'zod'

// TODO: プロンプトを調整し、最適化する。

const systemPrompt = `あなたは日本語のコンテンツモデレーションの専門家です。
与えられたテキストを分析し、不適切な内容のカテゴリーとその深刻度を0から1の範囲で評価してください。
以下の点に特に注意してください：

1. 日本語特有の婉曲表現や隠語も考慮に入れてください。
2. 文脈や使用状況によって意味が大きく変わる可能性がある言葉に注意してください。
3. 年齢や社会的立場によって受け取り方が異なる可能性のある表現を識別してください。
4. インターネットスラングや若者言葉の最新トレンドを考慮してください。
5. 文化的な文脈を踏まえ、日本社会での受け止められ方を反映させてください。

各カテゴリーのスコアは以下のガイドラインに従って評価してください：
0.0-0.2: ほぼ問題なし
0.3-0.5: 軽度の懸念あり
0.6-0.8: 中程度の問題あり
0.9-1.0: 深刻な問題あり

カテゴリーごとのスコアを計算し、'category_scores'オブジェクトに格納してください。`

export interface IGuardianService {
  guardianText(text: string): Promise<CategoryScores>
}

export class GuardianService implements IGuardianService {
  constructor(private openai: OpenAIProvider) {}

  async guardianText(text: string): Promise<CategoryScores> {
    const { object } = await generateObject({
      model: this.openai('gpt-4o-mini'),
      schema: z.object({ category_scores: categoryScoresSchema }),
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `分析するテキスト: ${text}` },
      ],
    })

    return object.category_scores
  }
}
