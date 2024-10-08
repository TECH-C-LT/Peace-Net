import { AnthropicProvider } from '@ai-sdk/anthropic'
import { GoogleGenerativeAIProvider } from '@ai-sdk/google'
import { OpenAIProvider } from '@ai-sdk/openai'
import { InternalServerError } from '@peace-net/shared/core/error'
import { Models } from '@peace-net/shared/types/model'
import { PrismResult } from '@peace-net/shared/types/prism'
import { generateObject } from 'ai'
import { z } from 'zod'

import { selectAIModel } from '~/libs/models'

const systemPrompt = `
あなたは、入力されたテキストをポジティブな視点とネガティブな視点の両方で捉え、それぞれの視点から考えられる表現を生成する専門家です。
以下の指針に従って、入力されたテキストに対するポジティブな候補とネガティブな候補の両方を返してください

1. 入力されたテキストの感情的なトーンを分析し、ポジティブな要素とネガティブな要素の両方を特定してください。
2. ポジティブな視点：
   - ネガティブな内容を、同じ意味を持ちながらもポジティブに捉えた表現を生成してください。
     - 「失敗した」→「改善の機会を得た」
     - 「問題がある」→「課題がある」
     - 「できない」→「まだ習得途中である」
3. ネガティブな視点：
   - 現実的かつ批判的な視点での表現も示してください。ただし、攻撃的や極端な表現を避け、公平かつ適切な表現を心がけてください。
     - 「改善の機会を得た」→「目標に到達できなかった」
     - 「課題がある」→「解決しなければならない問題が残っている」
4. ポジティブな表現は、建設的で協調的なフィードバックとなるよう心がけ、批判的な要素をポジティブに変換してください。
5. ネガティブな表現は、現実的な状況や課題を反映しつつ、過度に攻撃的にならないよう配慮してください。
6. ポジティブな見方では、現実的でありながら希望的な視点を提供し、ネガティブな見方では、現実に即した課題を明示してください。
7. 元のメッセージの核心や意図を維持しつつ、異なる視点からの候補を生成し、ユーザーが多角的に内容を理解できるようにしてください。
8. 文化的な配慮を行い、適切かつ敬意を払った表現を使用してください。
9. 変換後のテキストが自然で流暢に読めるようにしてください。
10. 極端な美化や過度な否定的視点にならないよう注意し、バランスの取れたポジティブとネガティブの視点を提供してください。

変換後のテキストは、以下のように 'positive' と 'negative' オブジェクトに格納してください。

- ポジティブ視点からのテキスト候補: 'positive'
- ネガティブ視点からのテキスト候補: 'negative'
`

export interface IPrismService {
  prismText(text: string, selectedModel: Models): Promise<PrismResult>
}

export class PrismService implements IPrismService {
  constructor(
    private openai: OpenAIProvider,
    private anthropic: AnthropicProvider,
    private google: GoogleGenerativeAIProvider,
    private groq: OpenAIProvider,
  ) {}

  async prismText(text: string, selectedModel: Models): Promise<PrismResult> {
    try {
      const model = selectAIModel(
        selectedModel,
        this.openai,
        this.anthropic,
        this.google,
        this.groq,
      )

      const { object } = await generateObject({
        model,
        schema: z.object({ positive: z.string(), negative: z.string() }),
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `変換するテキスト: ${text}` },
        ],
      })

      return object
    } catch (error) {
      console.error(error)
      throw new InternalServerError('Failed to generate text')
    }
  }
}
