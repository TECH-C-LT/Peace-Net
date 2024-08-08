import { Metadata } from 'next'
import { MainDescription, MainTitle } from '~/app/(main)/components/text'
import GenerateApiKeyButton from '~/app/(main)/dashboard/api-keys/components/generate-api-key/button'
import ApiKeyTable from './components/api-key-table'

export const metadata: Metadata = {
  title: 'API Keys',
}

export default function ApiKeys() {
  return (
    <section>
      <div className="flex items-center justify-between gap-1">
        <MainTitle>API Keys</MainTitle>
        <GenerateApiKeyButton />
      </div>
      <MainDescription>
        オーナーとして、APIキーを表示および管理できます。
        <br />
        APIキーを他人と共有したり、ブラウザやその他のクライアント側のコードで公開したりしないでください。
      </MainDescription>
      <ApiKeyTable />
    </section>
  )
}
