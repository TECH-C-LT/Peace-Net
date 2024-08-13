import Header from '~/components/header'
import { Navigation } from '~/components/navigation'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <article className="mx-auto max-w-7xl px-3 pb-24 pt-16 md:px-6">
      <Header />
      {children}
      <Navigation />
    </article>
  )
}
