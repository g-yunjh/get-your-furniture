// 가구 상품 타입
export interface Furniture {
  id: string
  title: string
  description: string
  price: number
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

// 가구 생성 타입
export interface CreateFurniture {
  title: string
  description: string
  price: number
  seller_phone: string
  condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor'
  location: string
  images: string[]
  password: string
  chat_link?: string
}

// 가구 상품 업데이트 타입
export interface UpdateFurniture extends Partial<CreateFurniture> {
  is_sold?: boolean
}

// 검색 필터 타입
export interface SearchFilters {
  category_id?: string
  min_price?: number
  max_price?: number
  condition?: string[]
  location?: string
  is_sold?: boolean
}

// 페이지네이션 타입
export interface Pagination {
  page: number
  limit: number
  total: number
  total_pages: number
}

// API 응답 타입
export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

// 페이지네이션된 응답 타입
export interface PaginatedResponse<T> {
  data: T[]
  pagination: Pagination
}
