'use client'

import { Button } from '@peace-net/ui/components/ui/button'
import { LogOutIcon } from 'lucide-react'
import { useActionState } from 'react'

import { signOut } from '~/server/actions/auth'

export default function SignOutButton() {
  const [_, signOutAction, isPending] = useActionState(signOut, null)

  return (
    <form action={signOutAction}>
      <Button
        variant="ghost"
        className="hover:text-destructive w-full justify-start"
        disabled={isPending}
      >
        <LogOutIcon className="mr-2 h-5 w-5" />
        ログアウト
      </Button>
    </form>
  )
}
