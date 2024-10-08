'use client'

import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import {
  SiAnthropic,
  SiGoogle,
  SiMeta,
  SiOpenai,
} from '@icons-pack/react-simple-icons'
import { Label } from '@peace-net/ui/components/ui/label'
import { useActionState } from 'react'

import { Field, FieldError } from '~/components/common/field'
import { InputConform } from '~/components/conform/input'
import { SelectConform } from '~/components/conform/select'
import { SliderConform } from '~/components/conform/slider'
import { TextareaConform } from '~/components/conform/textarea'

import { PrismAction } from '../../actions/prism'
import type { Prism } from '../../schemas/prism'
import { prismSchema } from '../../schemas/prism'
import LimitReachedDialog from '../limit-reached-dialog'
import { ResultSyntax } from '../result-syntax'
import ScoreThresholdDescription from '../score-threshold-description'
import SubmitButton from '../submit-button'

function isSuccessResult(
  result: any,
): result is { status: 'success'; value: Prism } {
  if (!result) return false
  return result.status === 'success' && 'value' in result
}

export function PrismForm() {
  const [lastResult, action, isPending] = useActionState(PrismAction, null)
  const [form, fields] = useForm({
    constraint: getZodConstraint(prismSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: prismSchema })
    },
    shouldRevalidate: 'onInput',
    defaultValue: {
      api: 'prisms',
      type: 'text',
      text: isSuccessResult(lastResult) ? lastResult.value.text : '',
      model: isSuccessResult(lastResult)
        ? lastResult.value.model
        : 'gpt-4o-mini',
      result: isSuccessResult(lastResult) ? lastResult.value.result : '',
    },
  })

  return (
    <>
      <form
        method="POST"
        {...getFormProps(form)}
        action={action}
        className="mx-auto max-w-2xl flex-grow space-y-4"
      >
        <InputConform type="hidden" meta={fields.api} />
        <InputConform type="hidden" meta={fields.type} />

        <Field>
          <Label htmlFor={fields.model.id}>使用するAIモデル</Label>
          <SelectConform
            placeholder="AIモデルを選択"
            meta={fields.model}
            items={[
              { value: 'gpt-4o-mini', name: 'GPT-4o mini', Icon: SiOpenai },
              {
                value: 'claude-3-haiku',
                name: 'Claude 3 Haiku',
                Icon: SiAnthropic,
              },
              {
                value: 'gemini-1.5-flash',
                name: 'Gemini 1.5 Flash',
                Icon: SiGoogle,
              },
              {
                value: 'llama-3.1',
                name: 'Llama 3.1',
                Icon: SiMeta,
              },
            ]}
          />
          {fields.model.errors && (
            <FieldError>{fields.model.errors}</FieldError>
          )}
        </Field>
        <Field>
          <Label htmlFor={fields.text.id}>テキスト</Label>
          <TextareaConform
            meta={fields.text}
            className="h-auto min-w-full border text-base"
            autoFocus
          />
          {fields.text.errors && <FieldError>{fields.text.errors}</FieldError>}
        </Field>
        <SubmitButton isPending={isPending} />
      </form>
      {isSuccessResult(lastResult) && !lastResult.value.isLimitReached && (
        <ResultSyntax code={lastResult.value.result} />
      )}
      {isSuccessResult(lastResult) && lastResult.value.isLimitReached && (
        <LimitReachedDialog />
      )}
    </>
  )
}
