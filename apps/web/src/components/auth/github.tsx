'use client'

import { Button } from '@peace-net/ui/components/ui/button'
import { GithubIcon, Loader2Icon } from 'lucide-react'
import { useActionState } from 'react'
import { signInWithGithub } from '~/server/actions/auth'

export default function GitHub() {
  const [_, signInAction, isPending] = useActionState(signInWithGithub, null)

  return (
    <form action={signInAction} className="flex justify-center px-4 py-3">
      <Button className="w-full" size="lg" disabled={isPending}>
        <GithubIcon className="mr-2 h-5 w-5" />
        GitHubでログイン
        {isPending && (
          <Loader2Icon className="ml-2 h-5 w-5 animate-spin ease-in-out" />
        )}
      </Button>
    </form>
  )
}
