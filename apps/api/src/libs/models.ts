import { AnthropicProvider, createAnthropic } from '@ai-sdk/anthropic'
import {
  createGoogleGenerativeAI,
  GoogleGenerativeAIProvider,
} from '@ai-sdk/google'
import { createOpenAI, OpenAIProvider } from '@ai-sdk/openai'
import { Models } from '@peace-net/shared/types/model'
import { LanguageModel } from 'ai'

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

export const selectAIModel: (
  selectedModel: Models,
  openai: OpenAIProvider,
  anthropic: AnthropicProvider,
  google: GoogleGenerativeAIProvider,
) => LanguageModel = (selectedModel, openai, anthropic, google) => {
  switch (selectedModel) {
    case 'gpt-4o-mini':
      return openai('gpt-4o-mini')
    case 'claude-3-haiku':
      return anthropic('claude-3-haiku-20240307')
    case 'gemini-1.5-flash':
      return google('models/gemini-1.5-flash')
    default:
      return openai('gpt-4o-mini')
  }
}
