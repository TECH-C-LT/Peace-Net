import { Database } from './database'

export type ApiKey = Database['public']['Tables']['api_keys']['Row']

export type Plan = Database['public']['Tables']['plans']['Row']

export type UsageLog = Database['public']['Tables']['usage_logs']['Row']

export type UserPlan = Database['public']['Tables']['user_plans']['Row']
