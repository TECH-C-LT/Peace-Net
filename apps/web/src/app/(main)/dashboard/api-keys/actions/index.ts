'use server'

import { createClient } from '~/lib/supabase/server'

import { parseWithZod } from '@conform-to/zod'
import { generateApiKeySchema } from '../schemas'

import { v4 as uuidv4 } from 'uuid'
import { encryptApiKey } from '@peace-net/shared/utils/encryptions'
import { revalidatePath } from 'next/cache'

export async function generateApiKey(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: generateApiKeySchema })

  console.log('submission', submission)

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const { name, expires_at } = submission.value

  // APIキーを生成
  const apiKey = `pn-${uuidv4()}`
  const description = `${apiKey.slice(0, 3)}...${apiKey.slice(-3)}`
  const encrypted_key = encryptApiKey(apiKey, process.env.ENCRYPTION_KEY!)

  submission.value.api_key = apiKey

  const supabase = createClient()

  // 現在のユーザーを取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return submission.reply()
  }

  // APIキーをDBに保存
  const { error } = await supabase.from('api_keys').insert({
    name,
    description,
    encrypted_key,
    expires_at: expires_at.toISOString(),
    is_active: true,
    user_id: user.id,
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error(error)
    return submission.reply()
  }

  revalidatePath('/dashboard/api-keys')

  return {
    status: submission.status,
    value: submission.value,
  }
}