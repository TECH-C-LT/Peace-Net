import BoxReveal from '@peace-net/ui/components/magicui/box-reveal'

export default function SunshineSection() {
  return (
    <section className="col-span-full px-6 py-12 md:col-span-2 md:row-start-3">
      <BoxReveal boxColor={'#eab308'} duration={0.5}>
        <h3 className="mb-4 text-5xl font-bold">
          <span className="text-yellow-500">-</span> Sunshine API
        </h3>
      </BoxReveal>
      <BoxReveal boxColor={'#eab308'} duration={0.5}>
        <p className="mb-4 text-lg">
          ネガティブなテキストをポジティブな表現に変換する革新的なAI駆動のテキスト変換システムです。
        </p>
      </BoxReveal>
      <BoxReveal boxColor={'#eab308'} duration={0.5}>
        <ul className="mb-4 list-inside list-disc space-y-2 text-sm">
          <li>感情分析: 高度なAIがテキストの感情的なトーンを正確に分析</li>
          <li>
            ポジティブ変換: ネガティブな表現をポジティブで建設的な表現に変換
          </li>
          <li>
            コンテキスト保持: 元のメッセージの意図や文脈を維持しながら変換
          </li>
          <li>多言語サポート: 複数の言語に対応し、グローバルな使用が可能</li>
        </ul>
      </BoxReveal>
    </section>
  )
}
