import { Button } from '@peace-net/ui/components/ui/button'
import { Loader2Icon, PlayIcon } from 'lucide-react'
import React from 'react'

export default function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button
      disabled={isPending}
      className="focus:outline-primary w-full bg-teal-500 hover:bg-teal-600"
      size="lg"
      onClick={() => console.log('clicked')}
    >
      <PlayIcon className="mr-2 h-5 w-5" />
      APIを試す
      {isPending && (
        <Loader2Icon className="ml-2 h-5 w-5 animate-spin ease-in-out" />
      )}
    </Button>
  )
}
