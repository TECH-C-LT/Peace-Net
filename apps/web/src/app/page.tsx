import {
  BentoCard,
  BentoGrid,
} from '@peace-net/ui/components/magicui/bento-grid'
import { BookTextIcon, ShieldCheckIcon, SunIcon } from 'lucide-react'

import { DOCS_URL } from '~/lib/config'

import { AnimatedBeamMultipleOutputDemo } from './components/beam'
import Hero from './components/hero'
import ScanText from './components/scan-text'

const features = [
  {
    background: <Hero />,
    className:
      'col-span-full md:col-span-4 row-span-3 md:row-span-6 flex items-center justify-center',
  },
  {
    Icon: ShieldCheckIcon,
    name: 'Guardian API',
    description:
      '入力されたテキストの内容を分析し、有害なコンテンツを検出するAI駆動の高度なフィルタリングシステムです。',
    href: `${DOCS_URL}/docs/features/guardian`,
    cta: 'くわしく知る',
    background: <ScanText />,
    className: 'col-span-full md:col-span-5 row-span-2 md:row-span-3',
  },
  {
    Icon: SunIcon,
    name: 'Sunshine API',
    description:
      'ネガティブなテキストをポジティブな表現に変換する革新的なAI駆動のテキスト変換システムです。',
    href: `${DOCS_URL}/docs/features/sunshine`,
    cta: 'くわしく知る',
    className: 'col-span-full md:col-span-5 row-span-2 md:row-span-3',
  },
  {
    Icon: BookTextIcon,
    name: 'API Reference',
    description: 'ドキュメントを確認して、APIを使いこなしましょう。',
    href: `${DOCS_URL}`,
    cta: 'API Reference',
    className: 'col-span-full md:col-span-3 row-span-2 md:row-span-3',
  },
  {
    name: '平和ネットAPI',
    description: '平和ネットAPIを使用し、平和なインターネットを作りましょう。',
    background: <AnimatedBeamMultipleOutputDemo />,
    className: 'col-span-full md:col-span-6 row-span-2 md:row-span-3',
  },
]

export default function Home() {
  return (
    <BentoGrid className="bg-secondary grid min-h-screen auto-rows-auto grid-cols-1 gap-2 p-2 md:grid-cols-9 md:grid-rows-9 md:p-4">
      {features.map((feature) => (
        <BentoCard
          key={feature.name}
          {...feature}
          className={`${feature.className} min-h-60 p-2 text-sm md:p-4 md:text-base`}
        />
      ))}
    </BentoGrid>
  )
}
