import { Navigation } from '~/components/navigation'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <article>
      <div>{children}</div>
      <Navigation />
    </article>
  )
}
