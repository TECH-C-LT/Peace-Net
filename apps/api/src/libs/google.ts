import { createGoogleGenerativeAI } from '@ai-sdk/google'

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
