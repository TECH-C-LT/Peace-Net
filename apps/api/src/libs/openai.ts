import { createOpenAI } from '@ai-sdk/openai'

export const OpenAIClient = (apiKey: string) => {
  return createOpenAI({
    apiKey,
  })
}
