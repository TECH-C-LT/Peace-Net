'use server'

import { parseWithZod } from '@conform-to/zod'
import { encryptApiKey } from '@peace-net/shared/utils/encryptions'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'

import {
  editApiKeySchema,
  generateApiKeySchema,
} from '~/app/(main)/dashboard/api-keys/schemas'
import { createClient } from '~/lib/supabase/server'

export async function generateApiKey(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: generateApiKeySchema })

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

  return {
    status: submission.status,
    value: submission.value,
  }
}

export async function editApiKey(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: editApiKeySchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const { name, expires_at, api_key_id } = submission.value

  const supabase = createClient()

  // APIキーを編集
  const { error } = await supabase
    .from('api_keys')
    .update({ name, expires_at: expires_at.toISOString() })
    .eq('id', api_key_id)

  if (error) {
    console.error(error)
    return submission.reply()
  }

  return {
    status: submission.status,
    value: submission.value,
  }
}

export async function deleteApiKey(apiKeyId: string) {
  const supabase = createClient()

  // APIキーを非アクティブ化
  const { error } = await supabase
    .from('api_keys')
    .update({ is_active: false })
    .eq('id', apiKeyId)

  if (error) {
    console.error(error)
    return
  }

  revalidateApiKeyPath()

  return
}

export async function revalidateApiKeyPath() {
  revalidatePath('/dashboard/api-keys')
}
