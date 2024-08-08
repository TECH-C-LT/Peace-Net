'use server'

import { createClient } from '~/lib/supabase/server'

export const getUser = async () => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    throw error
  }

  return data.user
}

export const getSession = async () => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  return data.session
}
