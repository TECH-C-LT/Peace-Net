import { CopyButton } from '@peace-net/ui/components/ui/copy-button'
import { Input } from '@peace-net/ui/components/ui/input'
import { CheckCircle2Icon } from 'lucide-react'

export default function GenerateApiKeyConfirm({ apiKey }: { apiKey: string }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg">
        <CheckCircle2Icon className="mb-0.5 mr-2 inline-block h-6 w-6 text-teal-500" />
        APIキーの生成が完了しました
      </h3>
      <p className="text-xs">
        このシークレットキーを安全でアクセスしやすい場所に保存してください。
        <br />
        セキュリティ上の理由から、再度閲覧することはできません。このAPIキーを紛失した場合は、新しいものを生成する必要があります。
      </p>
      <div className="my-3 flex gap-1">
        <Input value={apiKey} readOnly className="border-teal-500" />
        <CopyButton value={apiKey} variant="default" />
      </div>
    </div>
  )
}
