'use client'

import type { ApiKey } from '@peace-net/shared/types/entities'
import type { ColumnDef } from '@tanstack/react-table'

import DeleteDialog from './delete-dialog'
import EditDialog from './edit-dialog'

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
          <EditDialog
            id={apiKeyInfo.id}
            name={apiKeyInfo.name}
            expiresAt={apiKeyInfo.expires_at as string}
          />
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
