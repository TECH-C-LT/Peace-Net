import { Hono } from 'hono'

import { guardianRoutes } from '~/features/guardians/guardian.route'
import { sunshineRoutes } from '~/features/sunshines/sunshine.route'

const app = new Hono()
const api = new Hono()

const v1 = new Hono()

v1.get('/health', (c) => {
  return c.text('Peace Net API is up and running 🚀')
})

v1.route('/guardians', guardianRoutes)
v1.route('/sunshines', sunshineRoutes)

api.route('/v1', v1)

app.route('/api', api)

export default app
