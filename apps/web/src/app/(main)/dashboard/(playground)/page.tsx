import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '~/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Playground',
}

export default async function Playground() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <div>
      Playground
      <p>
        <code>{JSON.stringify(data, null, 2)}</code>
      </p>
    </div>
  )
}
