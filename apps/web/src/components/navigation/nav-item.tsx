'use client'

import { cn } from '@peace-net/shared/utils/classes'
import { buttonVariants } from '@peace-net/ui/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@peace-net/ui/components/ui/tooltip'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavItemProps } from '.'
import { SquareArrowOutUpRightIcon } from 'lucide-react'

export default function NavItem({
  item,
  isBrank = false,
}: Readonly<{
  item: NavItemProps
  isBrank?: boolean
}>) {
  const pathname = usePathname()
  const isActive = pathname === item.href

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          aria-current={isActive}
          {...(isBrank ? { target: '_blank' } : {})}
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'hover:bg-primary/10 size-12 rounded-full transition duration-500',
          )}
        >
          <item.icon
            strokeWidth={isActive ? 2 : 1.5}
            className={cn(
              'size-5 transition-all duration-200',
              isActive ? 'text-green-600' : 'text-primary',
            )}
          />
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p
          className={cn(
            'text-xs font-medium',
            isActive ? 'text-green-600' : 'text-primary',
          )}
        >
          {item.label}
          {isBrank && (
            <>
              <SquareArrowOutUpRightIcon
                className={cn('ml-1 inline-block size-3.5')}
                strokeWidth={1.5}
              />
              <span className="sr-only">Open in new tab</span>
            </>
          )}
        </p>
      </TooltipContent>
    </Tooltip>
  )
}
