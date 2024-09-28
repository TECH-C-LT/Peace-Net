'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@peace-net/ui/components/ui/alert-dialog'
import { buttonVariants } from '@peace-net/ui/components/ui/button'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import GitHub from '~/components/header/github'
import { DOCS_URL } from '~/lib/config'
import { createClient } from '~/lib/supabase/client'

export default function LimitReachedDialog() {
  const [user, setUser] = useState<User | null>(null)

  const handleGetSession = async () => {
    const supabase = createClient()

    const { data } = await supabase.auth.getUser()

    if (data) {
      setUser(data.user)
    }
  }

  useEffect(() => {
    handleGetSession()
  }, [])

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>これ以上使用できません。😭</AlertDialogTitle>
          <AlertDialogDescription>
            プレイグラウンドの利用回数が上限に達しました。
            <br />
            実際のAPIを使用してください。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <>
              <a
                href={DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: 'link' })}
              >
                APIドキュメント
              </a>
              {user?.is_anonymous ? (
                <GitHub />
              ) : (
                <Link href="/dashboard/api-keys" className={buttonVariants()}>
                  APIキー管理ページ
                </Link>
              )}
            </>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
