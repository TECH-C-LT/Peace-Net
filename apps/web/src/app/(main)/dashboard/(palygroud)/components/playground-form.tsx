'use client'

import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint } from '@conform-to/zod'
import { Label } from '@peace-net/ui/components/ui/label'
import { useActionState } from 'react'

import { Field, FieldError } from '~/components/common/field'
import { RadioGroupConform } from '~/components/conform/radio-group'
import { SelectConform } from '~/components/conform/select'

import { handlePlayground } from '../actions'
import type { Playground } from '../schemas'
import { playgroundSchema } from '../schemas'
import { GuardianImageForm } from './form/guardian-image'
import { GuardianTextForm } from './form/guardian-text'
import { PrismForm } from './form/prism'
import { SunshineForm } from './form/sunshine'

function isSuccessResult(
  result: any,
): result is { status: 'success'; value: Playground } {
  if (!result) return false
  return result.status === 'success' && 'value' in result
}

export function PlaygroundForm() {
  const [lastResult, _action, _isPending] = useActionState(
    handlePlayground,
    null,
  )
  const [form, fields] = useForm({
    constraint: getZodConstraint(playgroundSchema),
    lastResult,
    defaultValue: {
      api: isSuccessResult(lastResult) ? lastResult.value.api : 'guardians',
      type: isSuccessResult(lastResult) ? lastResult.value.type : 'text',
    },
  })

  return (
    <div className="rounded border p-4">
      <form
        method="POST"
        {...getFormProps(form)}
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
              {
                value: 'prisms',
                label: 'Prism API',
                description:
                  'ポジティブな視点とネガティブな視点の両方の候補を提供します。',
              },
            ]}
          />
          {fields.api.errors && (
            <FieldError>使用するAPIを選択してください</FieldError>
          )}
        </Field>
        {fields.api.value === 'guardians' && (
          <Field>
            <Label htmlFor={fields.type.id}>タイプ</Label>
            <SelectConform
              placeholder="タイプを選択"
              meta={fields.type}
              items={[
                { value: 'text', name: 'テキスト' },
                {
                  value: 'image',
                  name: '画像',
                },
              ]}
            />
            {fields.type.errors && (
              <FieldError>{fields.type.errors}</FieldError>
            )}
          </Field>
        )}
      </form>
      {fields.api.value === 'guardians' && fields.type.value === 'text' && (
        <GuardianTextForm />
      )}
      {fields.api.value === 'guardians' && fields.type.value === 'image' && (
        <GuardianImageForm />
      )}
      {fields.api.value === 'sunshines' && <SunshineForm />}
      {fields.api.value === 'prisms' && <PrismForm />}
    </div>
  )
}
