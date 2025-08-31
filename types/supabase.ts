export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      furniture: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          seller_name: string
          seller_phone: string
          condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor'
          location: string
          images: string[]
          is_sold: boolean
          password: string
          chat_link: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          seller_name: string
          seller_phone: string
          condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor'
          location: string
          images: string[]
          is_sold?: boolean
          password: string
          chat_link?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          seller_name?: string
          seller_phone?: string
          condition?: 'new' | 'like_new' | 'good' | 'fair' | 'poor'
          location?: string
          images?: string[]
          is_sold?: boolean
          password?: string
          chat_link?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
