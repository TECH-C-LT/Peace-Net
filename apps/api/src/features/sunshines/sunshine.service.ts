import { AnthropicProvider } from '@ai-sdk/anthropic'
import { GoogleGenerativeAIProvider } from '@ai-sdk/google'
import { OpenAIProvider } from '@ai-sdk/openai'
import { InternalServerError } from '@peace-net/shared/core/error'
import { Models } from '@peace-net/shared/types/model'
import { SunshineResult } from '@peace-net/shared/types/sunshine'
import { generateObject } from 'ai'
import { z } from 'zod'

import { selectAIModel } from '~/libs/models'

const systemPrompt = `
あなたは、ネガティブな表現をポジティブで建設的な表現に変換する専門家です。以下の指針に従ってテキストを変換してください：

1. 入力されたテキストの感情的なトーンを分析し、ネガティブな要素を特定してください。

2. ネガティブな表現を、同じ意味を持つポジティブな表現に置き換えてください。例えば：
   - 「失敗した」→「改善の機会を得た」
   - 「問題がある」→「課題がある」
   - 「できない」→「まだ習得途中である」

3. 批判的な表現を建設的なフィードバックに変換してください。

4. 悲観的な見方を、現実的でありながら希望的な見方に変えてください。

5. 攻撃的な言葉遣いを、協調的で理解を示す表現に変更してください。

6. 元のメッセージの核心や意図を維持しつつ、より前向きな表現方法を見つけてください。

7. 文化的な配慮を行い、適切かつ敬意を払った表現を使用してください。

8. 変換後のテキストが自然で流暢に読めるようにしてください。

9. 極端な美化や現実逃避にならないよう注意し、建設的で現実的なポジティブさを目指してください。

入力されたテキストを上記の指針に従って変換し、より前向きで建設的な表現にしてください。

変換したテキストは、'text'オブジェクトに格納してください。
`
export interface ISunshineService {
  sunshineText(text: string, selectedModel: Models): Promise<SunshineResult>
}

export class SunshineService implements ISunshineService {
  constructor(
    private openai: OpenAIProvider,
    private anthropic: AnthropicProvider,
    private google: GoogleGenerativeAIProvider,
  ) {}

  async sunshineText(
    text: string,
    selectedModel: Models,
  ): Promise<SunshineResult> {
    try {
      const model = selectAIModel(
        selectedModel,
        this.openai,
        this.anthropic,
        this.google,
      )

      const { object } = await generateObject({
        model,
        schema: z.object({ text: z.string() }),
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
