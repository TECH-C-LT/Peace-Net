'use client'

import { Button } from '@peace-net/ui/components/ui/button'
import { ResponsiveDialog } from '../common/responsive-dialog'
import { GithubIcon } from 'lucide-react'
import { createClient } from '~/lib/supabase/client'

export function GetStartedButton() {
  return (
    <ResponsiveDialog
      title="平和ネットAPIを使う"
      description="平和ネットAPIを使用し、平和なインターネットを作りましょう。"
      closeText="また今度"
    >
      <div className="flex justify-center px-4 py-3">
        <Button
          className="w-full"
          size="lg"
          onClick={async () => {
            const supabase = createClient()

            await supabase.auth.signInWithOAuth({
              provider: 'github',
              options: {
                redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
              },
            })
          }}
        >
          <GithubIcon className="mr-2 h-5 w-5" />
          GitHubでログイン
        </Button>
      </div>
    </ResponsiveDialog>
  )
}
