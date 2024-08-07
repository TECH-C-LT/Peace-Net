import type { Metadata } from 'next'
import '@peace-net/ui/globals.css'
import { Noto_Sans_JP } from 'next/font/google'
import Header from '~/components/header'
import { ScrollArea } from '@peace-net/ui/components/ui/scroll-area'

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: '平和ネット API',
    template: '%s | 平和ネット API',
  },
  description: '平和なインターネットを目指すAPIを提供します。',
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
          <Header />
          {children}
        </ScrollArea>
      </body>
    </html>
  )
}
