import { zValidator } from '@hono/zod-validator'
import { sunshineTextRequestSchema } from '@peace-net/shared/schemas/sunshine'
import { handleError } from '@peace-net/shared/utils/error-handler'
import { Hono } from 'hono'

import { SunshineController } from './sunshine.controller'
import { SunshineUseCase } from './sunshine.usecase'

/**
 * Sunshine APIのルーティングを定義します
 * ネガティブなテキストをポジティブなテキストに変換するエンドポイントを提供
 * - POST /text: テキスト変換
 */
const sunshineRoutes = new Hono()

sunshineRoutes.post(
  '/text',
  zValidator('json', sunshineTextRequestSchema, (result, c) => {
    if (!result.success) {
      return handleError(c, result.error)
    }
    return
  }),
  async (c) => {
    return new SunshineController(new SunshineUseCase()).sunshineText(c)
  },
)

export { sunshineRoutes }
