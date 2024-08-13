import { Button } from '@peace-net/ui/components/ui/button'

import { getSession } from '~/server/data/user'

import Logo from './logo'

export default async function Header() {
  const session = await getSession()
  const isAnonymous = session?.user.is_anonymous

  return (
    <header className="bg-background/50 fixed top-0 z-40 flex w-full items-center justify-between border p-1 backdrop-blur">
      <Logo />
      {isAnonymous && <Button>GitHubでログイン</Button>}
    </header>
  )
}
