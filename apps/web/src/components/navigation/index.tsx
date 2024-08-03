'use client'

import {
  HomeIcon,
  KeyRoundIcon,
  AlignEndHorizontalIcon,
  SettingsIcon,
  FileCode2Icon,
  LucideProps,
} from 'lucide-react'

import { TooltipProvider } from '@peace-net/ui/components/ui/tooltip'
import { Dock, DockIcon } from '@peace-net/ui/components/magicui/dock'
import { Separator } from '@peace-net/ui/components/ui/separator'
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
  outNavbar: [{ href: '#', icon: FileCode2Icon, label: 'API Reference' }],
}

export function Navigation() {
  return (
    <TooltipProvider>
      <Dock
        direction="middle"
        className="p bg-background/50 fixed bottom-6 right-1/2 flex translate-x-1/2 border shadow backdrop-blur"
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
