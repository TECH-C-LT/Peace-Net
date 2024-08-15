'use client'

import { cn } from '@peace-net/shared/utils/classes'
import { AnimatedBeam } from '@peace-net/ui/components/magicui/animated-beam'
import {
  AppWindowMacIcon,
  MonitorSmartphone,
  MonitorSmartphoneIcon,
  TabletSmartphoneIcon,
} from 'lucide-react'
import Image from 'next/image'
import React, { forwardRef, useRef } from 'react'

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'border-border z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
        className,
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = 'Circle'

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn(
        'absolute bottom-10 right-1/2 flex w-full max-w-md translate-x-1/2 items-center justify-center overflow-hidden rounded-lg p-10',
        className,
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <Icons.googleDrive />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.googleDocs />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.whatsapp />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16">
            <Icons.openai />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
      />
    </div>
  )
}

const Icons = {
  openai: () => (
    <Image src="/peace-net.webp" alt="peace-net" width={50} height={50} />
  ),
  googleDrive: () => <AppWindowMacIcon />,
  whatsapp: () => <MonitorSmartphoneIcon />,
  googleDocs: () => <TabletSmartphoneIcon />,
}
