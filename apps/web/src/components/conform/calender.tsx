import type { FieldMetadata } from '@conform-to/react'
import { unstable_useControl as useControl } from '@conform-to/react'
import { cn } from '@peace-net/shared/utils/classes'
import { Button } from '@peace-net/ui/components/ui/button'
import { Calendar } from '@peace-net/ui/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@peace-net/ui/components/ui/popover'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

export function DatePickerConform({ meta }: { meta: FieldMetadata<Date> }) {
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const control = useControl(meta)

  return (
    <div>
      <input
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        ref={control.register}
        name={meta.name}
        defaultValue={
          meta.initialValue ? new Date(meta.initialValue).toISOString() : ''
        }
        onFocus={() => {
          triggerRef.current?.focus()
        }}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant={'outline'}
            className={cn(
              'w-64 justify-start text-left font-normal focus:ring-2 focus:ring-stone-950 focus:ring-offset-2',
              !control.value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {control.value ? (
              format(control.value, 'PPP')
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={new Date(control.value ?? '')}
            onSelect={(value) => control.change(value?.toISOString() ?? '')}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
