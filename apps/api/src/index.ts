import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/guardian', (c) => {
  return c.text('text')
})

app.get('/sunshine', (c) => {
  return c.text('text')
})

app.get('/usage', (c) => {
  return c.text('usage')
})

// apikey
const apikey = new Hono()
const auth = new Hono()
auth.get('/', (c) => {
  return c.text('apikey auth')
})

apikey.route('/auth', auth)

const generate = new Hono()
generate.get('/', (c) => {
  return c.text('apikey generate')
})
apikey.route('/generate', generate)

app.route('/apikey', apikey)

export default app
