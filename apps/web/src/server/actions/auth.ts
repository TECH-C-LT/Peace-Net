'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '~/lib/supabase/server'

export async function signInWithGithub() {
  const supabase = createClient()

  const URL = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${URL}/auth/callback`,
    },
  })

  console.log('data', data)
  console.log('error', error)

  if (data.url) {
    revalidatePath('/', 'layout')
    redirect(data.url) // use the redirect API for your server framework
  }
}

export async function signOut() {
  const supabase = createClient()

  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/')
}
