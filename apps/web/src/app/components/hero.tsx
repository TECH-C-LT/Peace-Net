import { cn } from '@peace-net/shared/utils/classes'
import { Badge } from '@peace-net/ui/components/ui/badge'
import { buttonVariants } from '@peace-net/ui/components/ui/button'
import { GithubIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { GetStartedButton } from '~/components/auth/start-button'
import { GITHUB_URL } from '~/lib/config'

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-3">
      <div className="mt-6 space-y-3 md:mt-0">
        <div className="text-left">
          <Badge variant="secondary">Beta</Badge>
        </div>
        <h1 className="my-2 text-center text-4xl font-bold md:text-5xl">
          平和ネット API<span className="text-teal-500">.</span>
        </h1>
        <h2 className="mt-[.5rem] text-center">
          <span className="text-teal-500">平和なインターネット</span>
          を目指すAPIを提供します。
        </h2>
      </div>
      <Image src="/peace-net.webp" alt="peace-net" width={150} height={150} />
      <GetStartedButton />
      <a
        href={GITHUB_URL}
        target="_blank"
        className={cn(
          buttonVariants({ variant: 'link' }),
          'mr-5 tracking-wider',
        )}
      >
        <GithubIcon className="mr-2 h-5 w-5" />
        GitHub
      </a>
    </div>
  )
}
