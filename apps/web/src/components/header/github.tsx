'use client'

import { Button } from '@peace-net/ui/components/ui/button'
import { GithubIcon, Loader2Icon } from 'lucide-react'
import React, { useActionState } from 'react'

import { linkIdentityGithub } from './actions'

export default function GitHub() {
  const [_, signInAction, isPending] = useActionState(linkIdentityGithub, null)
  return (
    <form action={signInAction}>
      <Button>
        <GithubIcon className="mr-2 h-5 w-5" />
        GitHubでログイン
        {isPending && (
          <Loader2Icon className="ml-2 h-5 w-5 animate-spin ease-in-out" />
        )}
      </Button>
    </form>
  )
}
