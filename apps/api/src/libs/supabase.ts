import { Database } from '@peace-net/shared/types/database'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const SupabaseClient = (url: string, serviceRoleKey: string) => {
  return createClient<Database>(url, serviceRoleKey)
}
