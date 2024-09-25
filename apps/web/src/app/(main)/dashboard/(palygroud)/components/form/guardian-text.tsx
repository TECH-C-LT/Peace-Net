'use client'

import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { SiAnthropic, SiGoogle, SiOpenai } from '@icons-pack/react-simple-icons'
import { Label } from '@peace-net/ui/components/ui/label'
import { useActionState } from 'react'

import { Field, FieldError } from '~/components/common/field'
import { InputConform } from '~/components/conform/input'
import { SelectConform } from '~/components/conform/select'
import { SliderConform } from '~/components/conform/slider'
import { TextareaConform } from '~/components/conform/textarea'

import { GuardianTextAction } from '../../actions/guardian-text'
import type { GuardianText } from '../../schemas/guardian'
import { guardianTextSchema } from '../../schemas/guardian'
import LimitReachedDialog from '../limit-reached-dialog'
import { ResultSyntax } from '../result-syntax'
import ScoreThresholdDescription from '../score-threshold-description'
import SubmitButton from '../submit-button'

function isSuccessResult(
  result: any,
): result is { status: 'success'; value: GuardianText } {
  if (!result) return false
  return result.status === 'success' && 'value' in result
}

export function GuardianTextForm() {
  const [lastResult, action, isPending] = useActionState(
    GuardianTextAction,
    null,
  )
  const [form, fields] = useForm({
    constraint: getZodConstraint(guardianTextSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: guardianTextSchema })
    },
    shouldRevalidate: 'onInput',
    defaultValue: {
      api: 'guardians',
      type: 'text',
      text: isSuccessResult(lastResult) ? lastResult.value.text : '',
      score_threshold: isSuccessResult(lastResult)
        ? lastResult.value.score_threshold
        : 0.5,
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
          <Label htmlFor={fields.score_threshold.id}>しきい値</Label>
          <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
            <SliderConform
              meta={fields.score_threshold}
              max={1}
              step={0.1}
              min={0.1}
            />
            <ScoreThresholdDescription
              value={Number(fields.score_threshold.value)}
            />
          </div>
          {fields.score_threshold.errors && (
            <FieldError>{fields.score_threshold.errors}</FieldError>
          )}
        </Field>

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
