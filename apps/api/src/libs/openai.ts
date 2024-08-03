import { createOpenAI } from '@ai-sdk/openai'

/**
 * OpenAI APIのクライアントを生成します
 *
 * @param apiKey - OpenAI APIのAPIキー
 * @returns OpenAI APIのクライアント
 */
export const OpenAIClient = (apiKey: string) => {
  return createOpenAI({
    apiKey,
  })
}
