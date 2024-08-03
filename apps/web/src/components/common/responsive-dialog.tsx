'use client'

import * as React from 'react'

import { useMediaQuery } from '~/hooks/use-media-query'
import { Button } from '@peace-net/ui/components/ui/button'
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

export function ResponsiveDialog({
  title,
  description,
  buttonText = title,
  closeText = 'Cancel',
  children,
}: {
  title: string
  description?: string
  buttonText?: string
  closeText?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">{buttonText}</Button>
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
      <DrawerTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto max-w-md">
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          {children}
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
