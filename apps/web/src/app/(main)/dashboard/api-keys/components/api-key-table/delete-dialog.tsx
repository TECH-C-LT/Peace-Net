import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@peace-net/ui/components/ui/alert-dialog'
import { Input } from '@peace-net/ui/components/ui/input'
import { Label } from '@peace-net/ui/components/ui/label'
import { Trash2Icon } from 'lucide-react'
import { Field } from '~/components/common/field'
import { deleteApiKey } from '~/app/(main)/dashboard/api-keys/actions'
import { toast } from 'sonner'

export default function DeleteDialog({
  id,
  name,
  description,
}: {
  id: string
  name: string
  description: string
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:bg-destructive/10 rounded p-1 transition-colors duration-300">
        <Trash2Icon className="text-destructive h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>APIキーを削除</AlertDialogTitle>
          <AlertDialogDescription>
            このAPIキーは直ちに無効になります。このキーを使用して行われたAPIリクエストは拒否され、このキーに依存しているシステムが壊れる可能性があります。一度無効化されると、このAPIキーの閲覧や変更はできなくなります。
          </AlertDialogDescription>
          <Field>
            <Label>{name}</Label>
            <Input value={description} readOnly />
          </Field>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>やめる</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteApiKey(id)
              toast.success('APIキーを削除しました')
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
          >
            APIキーを削除する
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
