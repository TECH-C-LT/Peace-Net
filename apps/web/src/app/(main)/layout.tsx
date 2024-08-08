import { Navigation } from '~/components/navigation'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <article>
      <div className="mx-auto max-w-7xl px-3 pb-24 pt-16 md:px-6">
        {children}
      </div>
      <Navigation />
    </article>
  )
}
