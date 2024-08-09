import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@peace-net/ui/components/ui/alert-dialog'
import { Edit3Icon } from 'lucide-react'
import EditDialogForm from './edit-dialog-form'

export default function EditDialog({
  id,
  name,
  expiresAt,
}: {
  id: string
  name: string
  expiresAt: string
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:bg-primary/10 rounded p-1 transition-colors duration-300">
        <Edit3Icon className="text-primary size-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>APIキーの編集</AlertDialogTitle>
          <EditDialogForm apiKeyId={id} name={name} expiresAt={expiresAt} />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">やめる</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
