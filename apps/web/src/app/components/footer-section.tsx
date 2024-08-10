import { cn } from '@peace-net/shared/utils/classes'
import { buttonVariants } from '@peace-net/ui/components/ui/button'
import { ArrowUpRightIcon } from 'lucide-react'
import { DOCS_URL, GITHUB_URL } from '~/lib/config'

export default function FooterSection() {
  return (
    <section className="relative col-span-full mx-[calc(50%-50vw)] mt-10 grid grid-flow-col justify-center gap-3 bg-teal-500 p-10 md:col-span-2 md:row-start-4">
      <a
        target="_blank"
        href={GITHUB_URL}
        className={cn(
          buttonVariants({ variant: 'link' }),
          'text-lg text-white',
        )}
      >
        GitHUb
        <ArrowUpRightIcon className={cn('ml-0.5 inline-block size-4')} />
        <span className="sr-only">Open in new tab</span>
      </a>
      <a
        target="_blank"
        href={DOCS_URL}
        className={cn(
          buttonVariants({ variant: 'link' }),
          'text-lg text-white',
        )}
      >
        APIドキュメント
        <ArrowUpRightIcon className={cn('ml-0.5 inline-block size-4')} />
        <span className="sr-only">Open in new tab</span>
      </a>
    </section>
  )
}
