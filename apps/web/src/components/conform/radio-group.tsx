import type { FieldMetadata } from '@conform-to/react'
import { unstable_useControl as useControl } from '@conform-to/react'
import {
  RadioGroup,
  RadioGroupItem,
} from '@peace-net/ui/components/ui/radio-group'
import type { ElementRef } from 'react'
import { useRef } from 'react'

export function RadioGroupConform({
  meta,
  items,
}: {
  meta: FieldMetadata<string>
  items: Array<{ value: string; label: string; description?: string }>
}) {
  const radioGroupRef = useRef<ElementRef<typeof RadioGroup>>(null)
  const control = useControl(meta)

  return (
    <div>
      <input
        ref={control.register}
        name={meta.name}
        defaultValue={meta.initialValue}
        tabIndex={-1}
        className="sr-only"
        onFocus={() => {
          radioGroupRef.current?.focus()
        }}
      />
      <RadioGroup
        ref={radioGroupRef}
        className="flex flex-col gap-1.5"
        value={control.value ?? ''}
        onValueChange={control.change}
        onBlur={control.blur}
      >
        {items.map((item) => {
          const isSelected = control.value === item.value

          return (
            <div
              className={`flex items-center gap-3 rounded border transition duration-500 ${isSelected && 'bg-teal-500/5'}`}
              key={item.value}
            >
              <div className="w-12">
                <RadioGroupItem
                  value={item.value}
                  id={`${meta.id}-${item.value}`}
                  className={`ml-3 text-teal-500 transition duration-200 ${isSelected && 'border-teal-500'}`}
                />
              </div>
              <label
                htmlFor={`${meta.id}-${item.value}`}
                className="cursor-pointer py-2 pr-4"
              >
                <p
                  className={`font-semibold tracking-wide transition duration-500 ${isSelected && 'text-teal-500'}`}
                >
                  {item.label}
                </p>
                {item.description && (
                  <span className="text-muted-foreground text-sm">
                    {item.description}
                  </span>
                )}
              </label>
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}
