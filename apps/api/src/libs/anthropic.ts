import { createAnthropic } from '@ai-sdk/anthropic'

/**
 * Anthropic APIのクライアントを生成します
 *
 * @param apiKey - Anthropic APIのAPIキー
 * @returns Anthropic APIのクライアント
 */
export const AnthropicClient = (apiKey: string) => {
  return createAnthropic({
    apiKey,
  })
}
