import { InternalServerError } from '@peace-net/shared/core/error'
import { Context } from 'hono'
import { env } from 'hono/adapter'
import { z } from 'zod'

const envSchema = z.object({
  PEACE_NET_API_DOCS_URL: z.string(),
  OPENAI_API_KEY: z.string(),
})

type envType = z.infer<typeof envSchema>

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
