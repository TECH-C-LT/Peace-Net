'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '~/lib/supabase/server'

export const linkIdentityGithub = async () => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.linkIdentity({
    provider: 'github',
  })

  console.log(data)

  if (error) {
    console.error(error)
    return
  }

  if (data.url) {
    revalidatePath('/dashboard', 'layout')
    redirect(data.url)
  }
}
