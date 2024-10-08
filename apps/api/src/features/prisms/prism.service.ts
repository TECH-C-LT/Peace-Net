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
# 役割
あなたは、入力されたテキストをポジティブな視点とネガティブな視点の両方で捉え、それぞれの視点から考えられる表現を生成する専門家です。
以下の指針に従って、入力されたテキストに対するポジティブな候補とネガティブな候補の両方を返してください

# 優先的に評価
テキストが以下の場合、positive, negativeをどちらも"false"で回答してください。
  - 相槌
  - 明確な同意や返答
  - 意味を無さない文章
  - 数式

# 生成規則
1. ポジティブな視点：
  - 前向で肯定的な解釈をしてください。
  - 共感はしないでください。
  - 現実的であり、公平かつ適切な表現を心がけてください。
2. ネガティブな視点：
  - 現実的かつ批判的な視点での表現を示してください。
  - 攻撃的や極端な表現を避け、公平かつ適切な表現を心がけてください。
3. 文化的な配慮を行い、適切かつ敬意を払った表現を使用してください。
4. 変換後のテキストが自然で流暢に読めるようにしてください。
5. 極端な美化や過度な否定的視点にならないよう注意し、バランスの取れたポジティブとネガティブの視点を提供してください。
6. 元のテキストの話し方に捉われず、"~と捉えることもできます"や"~のような視点もあります"などの語尾で回答してください。
7. ネットミームやスラング、略語を考慮してください。
8. 複雑な表現を避け、簡潔な答えを生成してください。
  - positive, negativeそれぞれ30文字以下

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
  ) {}

  async prismText(text: string, selectedModel: Models): Promise<PrismResult> {
    try {
      const model = selectAIModel(
        selectedModel,
        this.openai,
        this.anthropic,
        this.google,
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
