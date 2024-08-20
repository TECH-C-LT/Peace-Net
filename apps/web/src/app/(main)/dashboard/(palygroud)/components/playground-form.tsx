'use client'

import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { Button } from '@peace-net/ui/components/ui/button'
import { Label } from '@peace-net/ui/components/ui/label'
import { Loader2Icon, PlayIcon } from 'lucide-react'
import { useActionState } from 'react'

import { Field, FieldError } from '~/components/common/field'
import { RadioGroupConform } from '~/components/conform/radio-group'
import { SliderConform } from '~/components/conform/slider'
import { TextareaConform } from '~/components/conform/textarea'

import { handlePlayground } from '../actions'
import type { Playground } from '../schemas'
import { playgroundSchema } from '../schemas'
import LimitReachedDialog from './limit-reached-dialog'
import { ResultSyntax } from './result-syntax'
import ScoreThresholdDescription from './score-threshold-description'

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
      score_threshold: isSuccessResult(lastResult)
        ? lastResult.value.score_threshold
        : 0.5,
      result: isSuccessResult(lastResult) ? lastResult.value.result : '',
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
        {fields.api.value === 'guardians' && (
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
        )}
        <Field>
          <Label htmlFor={fields.text.id}>テキスト</Label>
          <TextareaConform
            meta={fields.text}
            className="h-auto min-w-full border text-base"
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
      {isSuccessResult(lastResult) && !lastResult.value.isLimitReached && (
        <ResultSyntax code={lastResult.value.result} />
      )}
      {isSuccessResult(lastResult) && lastResult.value.isLimitReached && (
        <LimitReachedDialog />
      )}
    </div>
  )
}
