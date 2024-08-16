'use client'

import { Button } from '@peace-net/ui/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import { useActionState } from 'react'

import { signInAnonymously } from '~/server/actions/auth'

export default function Anonymously() {
  const [_, signInAction, isPending] = useActionState(signInAnonymously, null)

  return (
    <form action={signInAction} className="mt-1 flex justify-center">
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        disabled={isPending}
      >
        ログインしないで使ってみる
        {isPending && (
          <Loader2Icon className="ml-2 h-5 w-5 animate-spin ease-in-out" />
        )}
      </Button>
    </form>
  )
}
