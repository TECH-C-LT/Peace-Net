'use client'

import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { Button } from '@peace-net/ui/components/ui/button'
import { Label } from '@peace-net/ui/components/ui/label'
import { Loader2Icon, PlayIcon } from 'lucide-react'
import { useActionState } from 'react'

import { Field, FieldError } from '~/components/common/field'
import { RadioGroupConform } from '~/components/conform/radio-group'
import { TextareaConform } from '~/components/conform/textarea'

import { handlePlayground } from '../actions'
import type { Playground } from '../schemas'
import { playgroundSchema } from '../schemas'
import { ResultSyntax } from './result-syntax'

function isSuccessResult(
  result: any,
): result is { status: 'success'; value: Playground } {
  if (!result) return false
  return result.status === 'success' && 'value' in result
}

export function PlaygroundForm() {
  const [lastResult, action, isPending] = useActionState(handlePlayground, null)
  const [form, fields] = useForm({
    constraint: getZodConstraint(playgroundSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: playgroundSchema })
    },
    shouldRevalidate: 'onInput',
    defaultValue: {
      api: isSuccessResult(lastResult) ? lastResult.value.api : 'guardians',
      text: isSuccessResult(lastResult) ? lastResult.value.text : '',
    },
  })
  return (
    <div className="flex flex-wrap gap-3 rounded border p-4">
      <form
        method="POST"
        {...getFormProps(form)}
        action={action}
        className="mx-auto max-w-2xl flex-grow space-y-4"
      >
        <Field>
          <Label htmlFor={fields.api.id}>使用するAPI</Label>
          <RadioGroupConform
            meta={fields.api}
            items={[
              {
                value: 'guardians',
                label: 'Guardian API',
                description:
                  '入力されたテキストの内容を分析し、有害なコンテンツを検出します。',
              },
              {
                value: 'sunshines',
                label: 'Sunshine API',
                description:
                  'ネガティブなテキストをポジティブな表現に変換します。',
              },
            ]}
          />
          {fields.api.errors && (
            <FieldError>使用するAPIを選択してください</FieldError>
          )}
        </Field>
        <Field>
          <Label htmlFor={fields.text.id}>テキスト</Label>
          <TextareaConform
            meta={fields.text}
            className="h-auto min-w-96 border text-base"
            autoFocus
          />
          {fields.text.errors && <FieldError>{fields.text.errors}</FieldError>}
        </Field>

        <div className="flex gap-2">
          <Button
            disabled={isPending}
            className="focus:outline-primary w-full bg-teal-500 hover:bg-teal-600"
            size="lg"
          >
            <PlayIcon className="mr-2 h-5 w-5" />
            APIを試す
            {isPending && (
              <Loader2Icon className="ml-2 h-5 w-5 animate-spin ease-in-out" />
            )}
          </Button>
        </div>
      </form>
      {isSuccessResult(lastResult) && (
        <ResultSyntax code={lastResult.value.result} />
      )}
    </div>
  )
}
