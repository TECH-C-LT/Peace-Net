import { Hono } from 'hono'

/**
 * Sunshine APIのルーティングを定義します
 * ネガティブなテキストをポジティブなテキストに変換するエンドポイントを提供
 * - POST /text: テキスト変換
 */
const sunshineRoutes = new Hono()

sunshineRoutes.post('/text', (c) => c.text('sunshines!'))

export { sunshineRoutes }
