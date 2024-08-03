import type { Metadata } from 'next'
import '@peace-net/ui/globals.css'
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: '平和ネット',
    template: '%s | 平和ネット',
  },
  description: '平和なインターネットを目指すAPIを提供します。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.className}`}>{children}</body>
    </html>
  )
}
