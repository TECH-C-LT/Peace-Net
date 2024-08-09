import { useActionState } from 'react'
import { editApiKey } from '~/app/(main)/dashboard/api-keys/actions'
import {
  editApiKeySchema,
  generateApiKeySchema,
} from '~/app/(main)/dashboard/api-keys/schemas'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { getFormProps, useForm } from '@conform-to/react'
import { Loader2Icon, Edit3Icon } from 'lucide-react'
import { Field, FieldError } from '~/components/common/field'
import { DatePickerConform } from '~/components/conform/calender'
import { InputConform } from '~/components/conform/input'
import { Label } from '@peace-net/ui/components/ui/label'
import { Button } from '@peace-net/ui/components/ui/button'

// 日本語の日付文字列をDate objectに変換する関数
function parseJapaneseDate(dateString: string): Date {
  const parts = dateString.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)
  if (parts) {
    return new Date(
      parseInt(parts[1]),
      parseInt(parts[2]) - 1,
      parseInt(parts[3]),
    )
  }
  return new Date() // フォールバック: 現在の日付を返す
}

export default function EditDialogForm({
  apiKeyId,
  name,
  expiresAt,
}: {
  apiKeyId: string
  name: string
  expiresAt: string
}) {
  console.log('EditDialogForm', apiKeyId, name, expiresAt)

  const [lastResult, action, isPending] = useActionState(editApiKey, null)
  const [form, fields] = useForm({
    constraint: getZodConstraint(editApiKeySchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: editApiKeySchema })
    },
    shouldRevalidate: 'onInput',
    defaultValue: {
      name: name,
      expires_at: parseJapaneseDate(expiresAt),
      api_key_id: apiKeyId,
    },
  })

  return (
    <form {...getFormProps(form)} action={action} className="space-y-4">
      <Field>
        <Label htmlFor={fields.name.id}>名前</Label>
        <InputConform meta={fields.name} type="text" autoFocus />
        {fields.name.errors && <FieldError>{fields.name.errors}</FieldError>}
      </Field>

      <Field>
        <Label htmlFor={fields.expires_at.id}>有効期限</Label>
        <DatePickerConform meta={fields.expires_at} />
        {fields.expires_at.errors && (
          <FieldError>{fields.expires_at.errors}</FieldError>
        )}
      </Field>

      <InputConform meta={fields.api_key_id} type="hidden" />

      <Button disabled={isPending} className="w-full" size="lg">
        <Edit3Icon className="mr-2 h-5 w-5" />
        APIキーを編集
        {isPending && (
          <Loader2Icon className="ml-2 h-5 w-5 animate-spin ease-in-out" />
        )}
      </Button>
    </form>
  )
}
