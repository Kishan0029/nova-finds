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
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          original_price: number | null
          rating: number
          reviews: number
          category: string
          image: string
          is_new: boolean
          discount_badge: string | null
          colors: string[] | null
          stock: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          original_price?: number | null
          rating?: number
          reviews?: number
          category: string
          image: string
          is_new?: boolean
          discount_badge?: string | null
          colors?: string[] | null
          stock?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          original_price?: number | null
          rating?: number
          reviews?: number
          category?: string
          image?: string
          is_new?: boolean
          discount_badge?: string | null
          colors?: string[] | null
          stock?: number
          created_at?: string
        }
      }
      // We will add more tables here (orders, order_items, etc.) as we expand
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
