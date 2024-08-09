'use client'

import { Database } from '@peace-net/shared/types/database'
import { ApiKey } from '@peace-net/shared/types/entities'
import { Button } from '@peace-net/ui/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@peace-net/ui/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@peace-net/ui/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import {
  Edit2Icon,
  Edit3Icon,
  EditIcon,
  MoreHorizontal,
  Trash2Icon,
  TrashIcon,
} from 'lucide-react'
import DeleteDialog from './delete-dialog'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ApiKeyTable = Omit<
  ApiKey,
  'user_id' | 'encrypted_key' | 'is_active'
>

export const columns: ColumnDef<ApiKeyTable>[] = [
  {
    accessorKey: 'name',
    header: '名前',
  },
  {
    accessorKey: 'description',
    header: 'APIキー',
  },
  {
    accessorKey: 'expires_at',
    header: '有効期限',
  },
  {
    accessorKey: 'last_used',
    header: '最終利用日',
  },
  {
    accessorKey: 'created_at',
    header: '作成日',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const apiKeyInfo = row.original

      return (
        <div className="flex gap-1">
          <Dialog>
            <DialogTrigger className="hover:bg-primary/10 rounded p-1 transition-colors duration-300">
              <Edit3Icon className="text-primary size-4" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>APIキーの編集</DialogTitle>
                <DialogDescription>
                  まだ実装されていません。🥲
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <DeleteDialog
            id={apiKeyInfo.id}
            name={apiKeyInfo.name}
            description={apiKeyInfo.description as string}
          />
        </div>
      )
    },
  },
]
