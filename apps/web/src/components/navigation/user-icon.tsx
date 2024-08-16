'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@peace-net/ui/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@peace-net/ui/components/ui/dropdown-menu'
import type { User } from '@supabase/supabase-js'

import SignOutButton from '../auth/sign-out-button'

export default function UserIcon({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="transition-opacity duration-200 hover:opacity-80">
          <AvatarImage
            src={user?.user_metadata.avatar_url}
            alt={user?.user_metadata.name}
          />
          <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.user_metadata.name}</DropdownMenuLabel>
        <DropdownMenuLabel className="py-0 text-sm text-gray-500">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
