import { UnauthorizedError } from '@peace-net/shared/core/error'
import { Context } from 'hono'

import { getEnv } from '~/config/environment'
import { ApiKeyRepository } from '~/features/apiKeys/apiKey.repository'
import { ApiKeyService } from '~/features/apiKeys/apiKey.service'
import { ApiKeyUsecase } from '~/features/apiKeys/apiKey.usecase'
import { SupabaseClient } from '~/libs/supabase'

export const authenticateMiddleware = async (c: Context) => {
  const authHeader = c.req.header('Authorization')
  const apiKey =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null

  if (!apiKey) {
    throw new UnauthorizedError('API key required')
  }

  const result = await new ApiKeyUsecase(
    new ApiKeyService(
      new ApiKeyRepository(
        SupabaseClient(
          getEnv(c).SUPABASE_URL,
          getEnv(c).SUPABASE_SERVICE_ROLE_KEY,
        ),
      ),
    ),
  ).verifyApiKey({ apiKey, encryptionKey: getEnv(c).ENCRYPTION_KEY })

  if (!result.ok) {
    throw result.error
  }

  c.set('apiKeyId', result.value.apiKeyId)
  c.set('userId', result.value.userId)

  return
}
