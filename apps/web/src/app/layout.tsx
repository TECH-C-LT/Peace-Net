import '@peace-net/ui/globals.css'

import { ScrollArea } from '@peace-net/ui/components/ui/scroll-area'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { Toaster } from 'sonner'

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: '平和ネット API',
    template: '%s | 平和ネット API',
  },
  description: '平和なインターネットを目指すAPIを提供します。',
  metadataBase: new URL('https://pe-ace.net'),
  keywords: [
    'API',
    '平和',
    '平和ネット',
    'コンテンツ分析',
    'NGテキスト',
    'テキスト変換',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansJp.className}`}>
        <ScrollArea className="h-dvh w-full overflow-hidden">
          {children}
        </ScrollArea>
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  )
}
