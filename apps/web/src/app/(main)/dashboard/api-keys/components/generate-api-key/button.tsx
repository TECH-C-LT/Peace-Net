'use client'

import { PlusIcon } from 'lucide-react'
import { GenerateApiKeyForm } from '~/app/(main)/dashboard/api-keys/components/generate-api-key/form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@peace-net/ui/components/ui/alert-dialog'
import { buttonVariants } from '@peace-net/ui/components/ui/button'
import { revalidateApiKeyPath } from '../../actions'

export default function GenerateApiKeyButton() {
  return (
    <AlertDialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          revalidateApiKeyPath()
        }
      }}
    >
      <AlertDialogTrigger
        className={`${buttonVariants()} bg-teal-500 hover:bg-teal-600`}
      >
        <PlusIcon className="mr-2 h-5 w-5" />
        APIキーを生成する
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>APIキーを生成する</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <GenerateApiKeyForm />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={`${buttonVariants({ variant: 'ghost' })} w-full`}
          >
            閉じる
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
