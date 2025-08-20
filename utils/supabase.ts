import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/supabase'

const config = useRuntimeConfig()

export const supabase = createClient<Database>(
  config.public.supabaseUrl,
  config.public.supabaseKey
)

// 인증 관련 유틸리티
export const auth = {
  // 현재 사용자 가져오기
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // 로그인
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  },

  // 회원가입
  async signUp(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    })
    if (error) throw error
    return data
  },

  // 로그아웃
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // 비밀번호 재설정
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  }
}

// 가구 관련 유틸리티
export const furniture = {
  // 모든 가구 가져오기
  async getAll(filters?: any, page = 1, limit = 12) {
    let query = supabase
      .from('furniture')
      .select(`
        *,
        seller:users(name, avatar_url),
        category:categories(name)
      `)
      .order('created_at', { ascending: false })

    // 필터 적용
    if (filters) {
      if (filters.category_id) {
        query = query.eq('category_id', filters.category_id)
      }
      if (filters.min_price) {
        query = query.gte('price', filters.min_price)
      }
      if (filters.max_price) {
        query = query.lte('price', filters.max_price)
      }
      if (filters.condition && filters.condition.length > 0) {
        query = query.in('condition', filters.condition)
      }
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`)
      }
      if (filters.is_sold !== undefined) {
        query = query.eq('is_sold', filters.is_sold)
      }
    }

    // 페이지네이션
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error, count } = await query
    if (error) throw error

    return {
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        total_pages: Math.ceil((count || 0) / limit)
      }
    }
  },

  // 단일 가구 가져오기
  async getById(id: string) {
    const { data, error } = await supabase
      .from('furniture')
      .select(`
        *,
        seller:users(name, avatar_url),
        category:categories(name)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // 가구 생성
  async create(furnitureData: any) {
    const { data, error } = await supabase
      .from('furniture')
      .insert(furnitureData)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // 가구 업데이트
  async update(id: string, furnitureData: any) {
    const { data, error } = await supabase
      .from('furniture')
      .update(furnitureData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // 가구 삭제
  async delete(id: string) {
    const { error } = await supabase
      .from('furniture')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// 카테고리 관련 유틸리티
export const categories = {
  // 모든 카테고리 가져오기
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) throw error
    return data
  }
}

// 파일 업로드 유틸리티
export const storage = {
  // 이미지 업로드
  async uploadImage(file: File, path: string) {
    const { data, error } = await supabase.storage
      .from('furniture-images')
      .upload(path, file)

    if (error) throw error
    return data
  },

  // 이미지 URL 가져오기
  getImageUrl(path: string) {
    const { data } = supabase.storage
      .from('furniture-images')
      .getPublicUrl(path)

    return data.publicUrl
  },

  // 이미지 삭제
  async deleteImage(path: string) {
    const { error } = await supabase.storage
      .from('furniture-images')
      .remove([path])

    if (error) throw error
  }
}
