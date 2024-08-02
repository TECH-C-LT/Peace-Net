import { Context } from 'hono'
import { env } from 'hono/adapter'
import { z } from 'zod'

const envSchema = z.object({
  OPENAI_API_KEY: z.string(),
})

type envType = z.infer<typeof envSchema>

export const getEnv = (c: Context) => {
  const environment = env<envType>(c)

  const { error } = envSchema.safeParse(environment)
  if (error) {
    throw new Error(`Invalid environment: ${error.message}`)
  }

  return environment
}
