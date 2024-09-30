import {
  BentoCard,
  BentoGrid,
} from '@peace-net/ui/components/magicui/bento-grid'
import {
  BookTextIcon,
  PyramidIcon,
  ShieldCheckIcon,
  SunIcon,
} from 'lucide-react'

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
      '入力されたテキストや画像を分析し、有害なコンテンツを検出するAPIです。',
    href: `${DOCS_URL}/docs/features/guardian`,
    cta: 'くわしく知る',
    background: <ScanText />,
    className: 'col-span-full md:col-span-5 row-span-2 md:row-span-3',
  },
  {
    Icon: SunIcon,
    name: 'Sunshine API',
    description: '不適切なテキストを適切なテキストに変換するAPIです。',
    href: `${DOCS_URL}/docs/features/sunshine`,
    cta: 'くわしく知る',
    className: 'col-span-full md:col-span-5 row-span-2 md:row-span-3',
  },
  {
    Icon: BookTextIcon,
    name: 'API Reference',
    description: 'ドキュメントを確認して、APIを使いこなしましょう。',
    href: `${DOCS_URL}`,
    cta: 'ドキュメントを見る',
    background: <AnimatedBeamMultipleOutputDemo />,
    className: 'col-span-full md:col-span-4 row-span-2 md:row-span-3',
  },
  {
    Icon: PyramidIcon,
    name: 'Prism API',
    description:
      '入力されたテキストに対してポジティブな視点とネガティブな視点の両方の候補を提供するAPIです。',
    href: `${DOCS_URL}/docs/features/prism`,
    cta: 'くわしく知る',
    className:
      ' row-start-9 col-span-full md:col-span-5 row-span-2 md:row-span-3',
  },
]

export default function Home() {
  return (
    <BentoGrid className="bg-secondary grid min-h-screen auto-rows-auto grid-cols-1 gap-2 p-2 md:grid-cols-9 md:grid-rows-9 md:p-4">
      {features.map((feature) => (
        <BentoCard
          key={feature.name}
          {...feature}
          className={`${feature.className} min-h-64 p-2 text-sm md:p-4 md:text-base`}
        />
      ))}
    </BentoGrid>
  )
}
