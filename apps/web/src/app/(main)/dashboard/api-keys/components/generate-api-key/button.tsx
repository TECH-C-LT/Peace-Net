'use client'

import { PlusIcon } from 'lucide-react'
import { GenerateApiKeyForm } from '~/app/(main)/dashboard/api-keys/components/generate-api-key/form'
import {
  AlertDialog,
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
import SquircleButton from '~/components/common/squircle-button'

export default function GenerateApiKeyButton() {
  return (
    <AlertDialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          revalidateApiKeyPath()
        }
      }}
    >
      <AlertDialogTrigger>
        <SquircleButton>
          <div className="flex gap-2 px-6">
            <PlusIcon className="h-5 w-5" />
            APIキーを生成する
          </div>
        </SquircleButton>
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
