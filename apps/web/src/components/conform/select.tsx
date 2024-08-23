import {
  type FieldMetadata,
  unstable_useControl as useControl,
} from '@conform-to/react'
import type { IconType} from '@icons-pack/react-simple-icons';
import { SiReact } from '@icons-pack/react-simple-icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@peace-net/ui/components/ui/select'
import type { ComponentProps, ElementRef } from 'react'
import { useRef } from 'react'

export const SelectConform = ({
  meta,
  items,
  placeholder,
  ...props
}: {
  meta: FieldMetadata<string>
  items: Array<{ name: string; value: string; Icon?: IconType }>
  placeholder: string
} & ComponentProps<typeof Select>) => {
  const selectRef = useRef<ElementRef<typeof SelectTrigger>>(null)
  const control = useControl(meta)

  return (
    <>
      <select
        name={meta.name}
        defaultValue={meta.initialValue ?? ''}
        className="sr-only"
        ref={control.register}
        aria-hidden
        tabIndex={-1}
        onFocus={() => {
          selectRef.current?.focus()
        }}
      >
        <option value="" />
        {items.map((option) => (
          <option key={option.value} value={option.value} />
        ))}
      </select>

      <Select
        {...props}
        value={control.value ?? ''}
        onValueChange={control.change}
        onOpenChange={(open) => {
          if (!open) {
            control.blur()
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => {
            return (
              <SelectItem key={item.value} value={item.value}>
                <div className="flex items-center gap-1.5">
                  {item.Icon && <item.Icon size={16} />}
                  {item.name}
                </div>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </>
  )
}
