import { getSession } from '~/server/data/user'
import Logo from './logo'
import { GetStartedButton } from '~/components/auth/start-button'

export default async function Header() {
  const session = await getSession()

  return (
    <header className="bg-background/50 fixed top-0 flex w-full items-center justify-between border p-1 backdrop-blur">
      <Logo />
      {!session && <GetStartedButton />}
    </header>
  )
}
