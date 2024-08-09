'use client'

import { useActionState, useEffect } from 'react'

import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { generateApiKey } from '~/app/(main)/dashboard/api-keys/actions'
import {
  GenerateApiKey,
  generateApiKeySchema,
} from '~/app/(main)/dashboard/api-keys/schemas'
import { Loader2Icon, PlusIcon } from 'lucide-react'
import { Field, FieldError } from '~/components/common/field'
import { Label } from '@peace-net/ui/components/ui/label'
import { InputConform } from '~/components/conform/input'
import { Button } from '@peace-net/ui/components/ui/button'
import { DatePickerConform } from '~/components/conform/calender'
import GenerateApiKeyConfirm from './confirm'
import { toast } from 'sonner'

function isSuccessResult(
  result: any,
): result is { status: 'success'; value: GenerateApiKey } {
  if (!result) return false
  return result.status === 'success' && 'value' in result
}

export function GenerateApiKeyForm() {
  const [lastResult, action, isPending] = useActionState(generateApiKey, null)
  const [form, fields] = useForm({
    constraint: getZodConstraint(generateApiKeySchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: generateApiKeySchema })
    },
    shouldRevalidate: 'onInput',
  })

  useEffect(() => {
    if (lastResult && lastResult.status === 'error') {
      toast.error('APIキーの生成に失敗しました')
    } else if (lastResult && lastResult.status === 'success') {
      toast.success('APIキーの生成が完了しました', {
        description:
          'APIキーをコピーして保存して、安全な場所に保管してください',
      })
    }
  }, [lastResult])

  return (
    <>
      {isSuccessResult(lastResult) ? (
        <GenerateApiKeyConfirm apiKey={lastResult.value.api_key!} />
      ) : (
        <form {...getFormProps(form)} action={action} className="space-y-4">
          <Field>
            <Label htmlFor={fields.name.id}>名前</Label>
            <InputConform meta={fields.name} type="text" autoFocus />
            {fields.name.errors && (
              <FieldError>{fields.name.errors}</FieldError>
            )}
          </Field>

          <Field>
            <Label htmlFor={fields.expires_at.id}>有効期限</Label>
            <DatePickerConform meta={fields.expires_at} />
            {fields.expires_at.errors && (
              <FieldError>{fields.expires_at.errors}</FieldError>
            )}
          </Field>

          <InputConform meta={fields.api_key} type="hidden" />
          {fields.api_key.errors && (
            <FieldError>{fields.api_key.errors}</FieldError>
          )}

          <Button disabled={isPending} className="w-full" size="lg">
            <PlusIcon className="mr-2 h-5 w-5" />
            APIキーを生成
            {isPending && (
              <Loader2Icon className="ml-2 h-5 w-5 animate-spin ease-in-out" />
            )}
          </Button>
        </form>
      )}
    </>
  )
}
