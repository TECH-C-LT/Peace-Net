import { createAnthropic } from '@ai-sdk/anthropic'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
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

/**
 * Google Generative AI APIのクライアントを生成します
 *
 * @param apiKey - Google Generative AI APIのAPIキー
 * @returns Google Generative AIのクライアント
 */
export const GoogleClient = (apiKey: string) => {
  return createGoogleGenerativeAI({
    apiKey,
  })
}

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
