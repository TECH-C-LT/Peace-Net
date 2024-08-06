import { NotFoundError } from '@peace-net/shared/core/error'
import { handleError } from '@peace-net/shared/utils/error-handler'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import { getEnv } from '~/config/environment'
import { guardianRoutes } from '~/features/guardians/guardian.route'
import { sunshineRoutes } from '~/features/sunshines/sunshine.route'

const app = new Hono()

// logger
// sample custom logger code
// export const customLogger = function Logger()
app.use(logger())
app.use(
  '/api/*',
  cors({
    origin: 'https://peace-net.vercel.app/',
    allowMethods: ['POST'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 864000, // ブラウザにキャッシュさせる有効時間
  }),
)

const api = new Hono()

const v1 = new Hono()

v1.route('/guardians', guardianRoutes)
v1.route('/sunshines', sunshineRoutes)

api.route('/v1', v1)

app.route('/api', api)

app.all('/', (c) =>
  c.json({
    message: `Welcome to the Peace Net API! Documentation is available at ${getEnv(c).PEACE_NET_API_DOCS_URL}`,
  }),
)

app.notFound((c) => {
  const method = c.req.method
  const path = new URL(c.req.url).pathname

  return handleError(
    c,
    new NotFoundError(
      `Unknown request URL: ${method} ${path}. Please check the URL for typos, or see the docs at ${getEnv(c).PEACE_NET_API_DOCS_URL}`,
    ),
  )
})
app.onError((c, e) => handleError(e, c))

export default app
