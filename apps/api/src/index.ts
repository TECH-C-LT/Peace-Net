import { NotFoundError } from '@peace-net/shared/core/error'
import { handleError } from '@peace-net/shared/utils/error-handler'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import { getEnv } from '~/config/environment'
import { guardianRoutes } from '~/features/guardians/guardian.route'
import { prismRoutes } from '~/features/prisms/prism.route'
import { sunshineRoutes } from '~/features/sunshines/sunshine.route'
import { authenticateMiddleware } from '~/middleware/authenticate.middleware'
import { usageMiddleware } from '~/middleware/usage.middleware'
const app = new Hono()

// for Hono logger
const _ = require('lodash')
export const customLogger = (request: string, ...rest: Object[]) => {
  const date = new Date().toISOString()
  // 直定義したくないけどやり方わからん
  // docusaurusもversion情報使うのでsource of truthにしたい
  const apiVersion = '1.6.2'

  const log = {
    timestamp: date,
    apiVersion: apiVersion,
    request: request,
  }

  console.log(_.merge(log, ...rest))
}
app.use(logger(customLogger))
app.use(
  '/*',
  cors({
    origin: '*',
    allowMethods: ['POST'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 864000, // ブラウザにキャッシュさせる有効時間
  }),
)

const v1 = new Hono()

v1.use('/*', async (c, next) => {
  await authenticateMiddleware(c)
  await usageMiddleware(c, next)
})

v1.route('/guardians', guardianRoutes)
v1.route('/sunshines', sunshineRoutes)
v1.route('/prisms', prismRoutes)

app.route('/v1', v1)

app.all('/', (c) =>
  c.json({
    message: `Welcome to the Peace Net API! Documentation is available at ${getEnv(c).DOCS_URL}`,
  }),
)

app.notFound((c) => {
  const method = c.req.method
  const path = new URL(c.req.url).pathname

  customLogger('INFO', { path: path, status: 404, error: 'Not Found' })
  return handleError(
    c,
    new NotFoundError(
      `Unknown request URL: ${method} ${path}. Please check the URL for typos, or see the docs at ${getEnv(c).DOCS_URL}`,
    ),
  )
})
app.onError((c, e) => handleError(e, c))

export default app
