import { GetStartedButton } from '~/components/auth/start-button'

export default function Home() {
  return (
    <div className="grid h-screen place-items-center">
      <div>
        <h1 className="text-2xl font-bold">平和ネット</h1>
        <GetStartedButton />
        <ul className="mt-4 list-inside list-disc">
          <li>
            スタートボタン
            <span className="text-xs">
              （👆これ。スタイルとかテキスト変えたかったら変えてー）
            </span>
          </li>
          <li>ドキュメントへのリンク</li>
          <li>APIの概要</li>
          <li>プラン（料金、使用量）</li>
        </ul>
      </div>
    </div>
  )
}
