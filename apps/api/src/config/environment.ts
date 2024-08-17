import { InternalServerError } from '@peace-net/shared/core/error'
import { Context } from 'hono'
import { env } from 'hono/adapter'
import { z } from 'zod'

const envSchema = z.object({
  DOCS_URL: z.string(),
  OPENAI_API_KEY: z.string(),
  ANTHROPIC_API_KEY: z.string(),
  GOOGLE_API_KEY: z.string(),
  SUPABASE_URL: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  ENCRYPTION_KEY: z.string(),
})

type envType = z.infer<typeof envSchema>

/**
 * 環境変数を取得します
 *
 * @param c - コンテキスト
 * @returns 環境変数
 * @throws 環境変数の取得に失敗した場合はエラーをスローします
 */
export const getEnv = (c: Context) => {
  const environment = env<envType>(c)

  const { error } = envSchema.safeParse(environment)
  if (error) {
    console.error('Error loading environment variables:', error)
    throw new InternalServerError(
      'Sorry, there was an error loading the environment variables. Please try again later.',
    )
  }

  return environment
}
