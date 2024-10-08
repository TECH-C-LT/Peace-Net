import { getSession } from '~/server/data/user'

import GitHub from './github'
import Logo from './logo'

export default async function Header() {
  const session = await getSession()
  const isAnonymous = session?.user.is_anonymous

  return (
    <header className="bg-background/50 fixed right-0 top-0 z-40 flex w-full items-center justify-between border-b p-1 backdrop-blur">
      <Logo />
      {isAnonymous && <GitHub />}
    </header>
  )
}
