export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_keys: {
        Row: {
          created_at: string | null
          description: string | null
          encrypted_key: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          last_used: string | null
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          encrypted_key?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          last_used?: string | null
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          encrypted_key?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          last_used?: string | null
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'api_keys_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      plans: {
        Row: {
          description: string | null
          id: string
          name: string
          price: number
          total_request_limit: number
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          price: number
          total_request_limit: number
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          price?: number
          total_request_limit?: number
        }
        Relationships: []
      }
      playground_usage: {
        Row: {
          count: number | null
          id: string
          last_reset: string | null
          total_count: number | null
          user_id: string
        }
        Insert: {
          count?: number | null
          id?: string
          last_reset?: string | null
          total_count?: number | null
          user_id: string
        }
        Update: {
          count?: number | null
          id?: string
          last_reset?: string | null
          total_count?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'playground_usage_user_id_fkey'
            columns: ['user_id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      usage_logs: {
        Row: {
          api_key_id: string | null
          date: string | null
          endpoint: string
          id: string
          request_count: number | null
        }
        Insert: {
          api_key_id?: string | null
          date?: string | null
          endpoint: string
          id?: string
          request_count?: number | null
        }
        Update: {
          api_key_id?: string | null
          date?: string | null
          endpoint?: string
          id?: string
          request_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'usage_logs_api_key_id_fkey'
            columns: ['api_key_id']
            isOneToOne: false
            referencedRelation: 'api_keys'
            referencedColumns: ['id']
          },
        ]
      }
      user_plans: {
        Row: {
          end_date: string | null
          id: string
          plan_id: string | null
          start_date: string
          total_requests_used: number | null
          user_id: string | null
        }
        Insert: {
          end_date?: string | null
          id?: string
          plan_id?: string | null
          start_date: string
          total_requests_used?: number | null
          user_id?: string | null
        }
        Update: {
          end_date?: string | null
          id?: string
          plan_id?: string | null
          start_date?: string
          total_requests_used?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'user_plans_plan_id_fkey'
            columns: ['plan_id']
            isOneToOne: false
            referencedRelation: 'plans'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_plans_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_playground_usage: {
        Args: {
          input_user_id: string
        }
        Returns: {
          new_count: number
          new_total_count: number
          remaining: number
        }[]
      }
      increment_total_requests_used: {
        Args: {
          p_user_id: string
        }
        Returns: undefined
      }
      increment_usage_log: {
        Args: {
          p_api_key_id: string
          p_endpoint: string
          p_date: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
