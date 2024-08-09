'use client'

import * as React from 'react'

import { useMediaQuery } from '~/hooks/use-media-query'
import { Button, buttonVariants } from '@peace-net/ui/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@peace-net/ui/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@peace-net/ui/components/ui/drawer'
import { LucideIcon } from 'lucide-react'
import SquircleButton from './squircle-button'

export function ResponsiveDialog({
  title,
  description,
  buttonText = title,
  Icon,
  closeText = 'Cancel',
  children,
}: {
  title: string
  description?: string
  buttonText?: string
  Icon?: LucideIcon
  closeText?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <SquircleButton>
            <div className="px-6">
              {Icon && <Icon className="mr-1 h-5 w-5" />}
              {buttonText}
            </div>
          </SquircleButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="whitespace-pre-wrap">
              {description}
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <SquircleButton>
          <div className="px-6">
            {Icon && <Icon className="mr-1 h-5 w-5" />}
            {buttonText}
          </div>
        </SquircleButton>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="w-full px-4 py-2">{children}</div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">{closeText}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
