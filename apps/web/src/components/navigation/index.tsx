'use client'

import { Dock, DockIcon } from '@peace-net/ui/components/magicui/dock'
import { Separator } from '@peace-net/ui/components/ui/separator'
import { TooltipProvider } from '@peace-net/ui/components/ui/tooltip'
import type { LucideProps } from 'lucide-react'
import {
  AlignEndHorizontalIcon,
  FileCode2Icon,
  GithubIcon,
  HomeIcon,
  KeyRoundIcon,
  SettingsIcon,
} from 'lucide-react'

import { DOCS_URL, GITHUB_URL } from '~/lib/config'

import NavItem from './nav-item'
import UserIcon from './user-icon'

export type NavItemProps = {
  href: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  label: string
}

const DATA: { navbar: NavItemProps[]; outNavbar: NavItemProps[] } = {
  navbar: [
    { href: '/dashboard', icon: HomeIcon, label: 'Playground' },
    { href: '/dashboard/api-keys', icon: KeyRoundIcon, label: 'API Keys' },
    { href: '/dashboard/usage', icon: AlignEndHorizontalIcon, label: 'Usage' },
    { href: '/settings', icon: SettingsIcon, label: 'Settings' },
  ],
  outNavbar: [
    {
      href: DOCS_URL,
      icon: FileCode2Icon,
      label: 'API Reference',
    },
    {
      href: GITHUB_URL,
      icon: GithubIcon,
      label: 'GitHub',
    },
  ],
}

export function Navigation() {
  return (
    <TooltipProvider>
      <Dock
        direction="middle"
        className="bg-background/50 fixed bottom-6 right-1/2 z-40 flex translate-x-1/2 border backdrop-blur"
      >
        {DATA.navbar.map((item) => (
          <DockIcon key={item.label}>
            <NavItem item={item} />
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        {DATA.outNavbar.map((item) => (
          <DockIcon key={item.label}>
            <NavItem item={item} isBrank />
          </DockIcon>
        ))}
        <DockIcon>
          <UserIcon />
        </DockIcon>
      </Dock>
    </TooltipProvider>
  )
}
