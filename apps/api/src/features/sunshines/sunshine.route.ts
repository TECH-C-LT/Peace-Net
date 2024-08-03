import { NotImplementedError } from '@peace-net/shared/core/error'
import { handleError } from '@peace-net/shared/utils/error-handler'
import { Hono } from 'hono'

/**
 * Sunshine APIのルーティングを定義します
 * ネガティブなテキストをポジティブなテキストに変換するエンドポイントを提供
 * - POST /text: テキスト変換
 */
const sunshineRoutes = new Hono()

sunshineRoutes.post('/text', async (c) => {
  try {
    throw new NotImplementedError('Sunshine API is not implemented yet')
  } catch (error) {
    return handleError(c, error)
  }
})

export { sunshineRoutes }
