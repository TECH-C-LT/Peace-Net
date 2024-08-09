import { Metadata } from 'next'
import GenerateApiKeyButton from '~/app/(main)/dashboard/api-keys/components/generate-api-key/button'
import ApiKeyTable from './components/api-key-table'
import { Suspense } from 'react'
import { Skeleton } from '@peace-net/ui/components/ui/skeleton'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@peace-net/ui/components/ui/card'

export const metadata: Metadata = {
  title: 'API Keys',
}

export default function ApiKeys() {
  return (
    <section>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-1">
            <CardTitle>API Keys</CardTitle>
            <GenerateApiKeyButton />
          </div>
          <CardDescription>
            オーナーとして、APIキーを表示および管理できます。
            <br />
            APIキーを他人と共有したり、ブラウザやその他のクライアント側のコードで公開したりしないでください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-70dvh w-full" />}>
            <ApiKeyTable />
          </Suspense>
        </CardContent>
      </Card>
    </section>
  )
}
