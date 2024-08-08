'use client'

import { CheckIcon, ClipboardIcon } from 'lucide-react'

import { Button, ButtonProps } from './button'
import * as React from 'react'
import { cn } from '@peace-net/shared/utils/classes'

interface CopyButtonProps extends ButtonProps {
  value: string
}

export async function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(value)
}

export function CopyButton({
  value,
  className,
  variant = 'ghost',

  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn('relative z-10 [&_svg]:h-5 [&_svg]:w-5', className)}
      onClick={() => {
        copyToClipboardWithMeta(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  )
}
