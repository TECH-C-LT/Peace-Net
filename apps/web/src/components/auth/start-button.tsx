'use client'

import { ResponsiveDialog } from '../common/responsive-dialog'
import GitHub from './github'

export function GetStartedButton() {
  return (
    <ResponsiveDialog
      title="平和ネットAPIを使う"
      description="平和ネットAPIを使用し、平和なインターネットを作りましょう。"
      closeText="また今度"
    >
      <GitHub />
    </ResponsiveDialog>
  )
}
