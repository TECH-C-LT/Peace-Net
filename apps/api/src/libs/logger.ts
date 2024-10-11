import { Context } from 'hono'

const _ = require('lodash')
// 直定義したくないけどやり方わからん
// docusaurusもversion情報使うのでsource of truthにしたい
const apiVersion = '1.6.2'

export const customLogger = (request: string, ...rest: Object[]) => {
  const log = {
    request: request,
  }

  console.log(_.merge(log, ...rest))
}

const log = (ctx: Context, level: string, ...rest: Object[]) => {
  const date = new Date().toISOString()
  const basicLog = {
    id: ctx.get('requestId'),
    timestamp: date,
    apiVersion: apiVersion,
    level: level,
    model: getModelFromContext(ctx),
  }
  customLogger(ctx.req, _.merge(basicLog, ...rest))
}

export const prismLog = (ctx: Context, level: string, ...rest: Object[]) => {
  const prismLog = {
    apiKind: 'prism',
  }
  log(ctx, level, _.merge(prismLog, ...rest))
}

const getModelFromContext = (ctx: Context) => {
  const model = ctx.req.json().model
  return model ? model : 'gpt-4o-mini'
}
