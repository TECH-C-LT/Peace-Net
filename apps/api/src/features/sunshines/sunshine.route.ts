import { NotImplementedError } from '@peace-net/shared/core/error'
import { handleError } from '@peace-net/shared/utils/error-handler'
import { Hono } from 'hono'

const sunshineRoutes = new Hono()

sunshineRoutes.post('/text', async (c) => {
  try {
    throw new NotImplementedError('Sunshine API is not implemented yet')
  } catch (error) {
    return handleError(c, error)
  }
})

export { sunshineRoutes }
