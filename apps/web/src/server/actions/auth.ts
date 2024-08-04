'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '~/lib/supabase/server'

export async function signInWithGithub() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (data.url) {
    revalidatePath('/dashboard', 'layout')
    redirect(data.url) // use the redirect API for your server framework
  }
}

export async function signOut() {
  const supabase = createClient()

  await supabase.auth.signOut()

  revalidatePath('/dashboard', 'layout')
  redirect('/')
}
