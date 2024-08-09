import BoxReveal from '@peace-net/ui/components/magicui/box-reveal'

export default function GuardianSection() {
  return (
    <section className="col-span-full px-6 py-12 md:col-span-2 md:row-start-2">
      <BoxReveal boxColor={'#0ea5e9'} duration={0.5}>
        <h3 className="mb-4 text-5xl font-bold">
          <span className="text-sky-500">-</span> Guardian API
        </h3>
      </BoxReveal>
      <BoxReveal boxColor={'#0ea5e9'} duration={0.5}>
        <p className="mb-4 text-lg">
          入力されたテキストの内容を分析し、有害なコンテンツを検出するAI駆動の高度なフィルタリングシステムです。
        </p>
      </BoxReveal>
      <BoxReveal boxColor={'#0ea5e9'} duration={0.5}>
        <ul className="mb-4 list-inside list-disc space-y-2 text-sm">
          <li>
            多面的な評価:
            性的表現、ヘイトスピーチ、自傷行為、暴力、誹謗中傷など、複数のカテゴリーでコンテンツを評価
          </li>
          <li>
            スコアリングシステム:
            各カテゴリーに0から1の間でスコアを付与し、リスクレベルを数値化
          </li>
          <li>パラメータでフラグを立てる基準を柔軟に設定</li>
          <li>
            高速で信頼性の高い分析結果を提供し、リアルタイムのモデレーションを実現
          </li>
          <li>
            APIインターフェースによりさまざまなプラットフォームへの組み込みが容易
          </li>
        </ul>
      </BoxReveal>
    </section>
  )
}
