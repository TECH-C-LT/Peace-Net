'use client'

import { PlusIcon } from 'lucide-react'
import { ResponsiveDialog } from '~/components/common/responsive-dialog'
import { GenerateApiKeyForm } from '~/app/(main)/dashboard/api-keys/components/generate-api-key/form'

export default function GenerateApiKeyButton() {
  return (
    <ResponsiveDialog
      title="新しいAPIキーを生成"
      Icon={PlusIcon}
      closeText="やめる"
    >
      <GenerateApiKeyForm />
    </ResponsiveDialog>
  )
}
