'use client'

import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { Input } from '@peace-net/ui/components/ui/input'
import { Label } from '@peace-net/ui/components/ui/label'
import { useActionState, useState } from 'react'

import { Field, FieldError } from '~/components/common/field'
import { InputConform } from '~/components/conform/input'
import { SliderConform } from '~/components/conform/slider'

import { GuardianImageAction } from '../../actions/guardian-image'
import type { GuardianImage } from '../../schemas/guardian'
import { guardianImageSchema } from '../../schemas/guardian'
import LimitReachedDialog from '../limit-reached-dialog'
import { ResultSyntax } from '../result-syntax'
import ScoreThresholdDescription from '../score-threshold-description'
import SubmitButton from '../submit-button'

function isSuccessResult(
  result: any,
): result is { status: 'success'; value: GuardianImage } {
  if (!result) return false
  return result.status === 'success' && 'value' in result
}

export function GuardianImageForm() {
  const [lastResult, action, isPending] = useActionState(
    GuardianImageAction,
    null,
  )
  const [form, fields] = useForm({
    constraint: getZodConstraint(guardianImageSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: guardianImageSchema })
    },
    shouldRevalidate: 'onInput',
    defaultValue: {
      api: 'guardians',
      type: 'image',
      image: isSuccessResult(lastResult) ? lastResult.value.text : '',
      score_threshold: isSuccessResult(lastResult)
        ? lastResult.value.score_threshold
        : 0.5,
      model: 'gpt-4o-mini',
      result: isSuccessResult(lastResult) ? lastResult.value.result : '',
    },
  })

  const [base64Image, setBase64Image] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          setBase64Image(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <form
        method="POST"
        {...getFormProps(form)}
        action={action}
        className="mx-auto max-w-2xl flex-grow space-y-4"
        encType="multipart/form-data"
      >
        <InputConform type="hidden" meta={fields.api} />
        <InputConform type="hidden" meta={fields.type} />
        <InputConform type="hidden" meta={fields.model} />

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
          <Label htmlFor={fields.image.id}>画像</Label>
          <InputConform type="hidden" meta={fields.image} value={base64Image} />
          <Input
            type="file"
            accept="image/png, image/jpeg, image/gif, image/webp"
            className="w-full"
            onChange={handleFileChange}
          />
          {fields.image.errors && (
            <FieldError>{fields.image.errors}</FieldError>
          )}
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
