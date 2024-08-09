import { cn } from '@peace-net/shared/utils/classes'
import BoxReveal from '@peace-net/ui/components/magicui/box-reveal'
import { Badge } from '@peace-net/ui/components/ui/badge'
import { buttonVariants } from '@peace-net/ui/components/ui/button'
import Image from 'next/image'
import { GetStartedButton } from '~/components/auth/start-button'

export default function HeroSection() {
  return (
    <>
      <section className="grid place-content-center px-6 py-20 md:py-40">
        <div>
          <BoxReveal boxColor={'#14b8a6'} duration={0.5}>
            <Badge variant="secondary">Beta</Badge>
          </BoxReveal>
          <BoxReveal boxColor={'#14b8a6'} duration={0.5}>
            <h1 className="my-2 text-6xl font-bold">
              平和ネット API<span className="text-teal-500">.</span>
            </h1>
          </BoxReveal>
          <BoxReveal boxColor={'#14b8a6'} duration={0.5}>
            <h2 className="mt-[.5rem] text-[1rem]">
              <span className="text-teal-500">平和なインターネット</span>
              を目指すAPIを提供します。
            </h2>
          </BoxReveal>
        </div>

        <div className="flex flex-wrap gap-2 pt-6">
          <BoxReveal boxColor={'#14b8a6'} duration={0.5}>
            <GetStartedButton />
          </BoxReveal>
          <BoxReveal boxColor={'#14b8a6'} duration={0.5}>
            <a
              target="_blank"
              href="https://docs.peeace.net"
              className={cn(buttonVariants({ variant: 'link' }))}
            >
              APIドキュメント
            </a>
          </BoxReveal>
        </div>
      </section>
      <section className="grid place-content-center">
        <BoxReveal boxColor={'#14b8a6'} duration={0.5}>
          <Image
            src="/peace-net.webp"
            alt="peace-net"
            width={300}
            height={300}
          />
        </BoxReveal>
      </section>
    </>
  )
}
