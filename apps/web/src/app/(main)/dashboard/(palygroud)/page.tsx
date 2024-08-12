import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@peace-net/ui/components/ui/card'
import type { Metadata } from 'next'

import { PlaygroundForm } from './components/playground-form'

export const metadata: Metadata = {
  title: 'Playground',
}

export default function ApiKeys() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="mb-2">Playground</CardTitle>
          <CardDescription>
            APIを試すことができます。アカウントごとに10回のリクエスト制限があります。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PlaygroundForm />
        </CardContent>
      </Card>
    </section>
  )
}
