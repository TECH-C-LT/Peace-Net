import type { FieldMetadata } from '@conform-to/react'
import { getInputProps } from '@conform-to/react'
import { Input } from '@peace-net/ui/components/ui/input'
import type { ComponentProps } from 'react'

export const InputConform = ({
  meta,
  type,
  ...props
}: {
  meta: FieldMetadata<string>
  type: Parameters<typeof getInputProps>[1]['type']
} & ComponentProps<typeof Input>) => {
  return (
    <Input
      {...getInputProps(meta, { type, ariaAttributes: true })}
      {...props}
      key={meta.id}
    />
  )
}
