'use client'

import { cn } from '@peace-net/shared/utils/classes'
import { buttonVariants } from '@peace-net/ui/components/ui/button'
import { Squircle } from 'react-ios-corners'

export default function SquircleButton({
  children,
  className,
  props,
}: {
  children: React.ReactNode
  className?: string
  props?: any
}) {
  return (
    <Squircle
      className={cn(
        buttonVariants({ size: 'lg' }),
        'bg-teal-500 px-0 hover:bg-teal-600',
        className,
      )}
      {...props}
    >
      {children}
    </Squircle>
  )
}
