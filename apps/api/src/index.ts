import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const v1 = new Hono()
v1.get('/', (c) => {
  return c.text('v1')
})

const guardian = new Hono()
guardian.get('/', (c) => {
  return c.text('guardian')
})
v1.route('guardian', guardian)

const sunshine = new Hono()
sunshine.get('/', (c) => {
  return c.text('sunshine')
})
v1.route('/sunshine', sunshine)

app.route('/v1', v1)

export default app
