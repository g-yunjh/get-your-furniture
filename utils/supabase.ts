import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/types/supabase'

// Supabase 클라이언트 싱글톤 반환 함수
export const createSupabaseClient = () => {
  const g = globalThis as unknown as { __gyf_supabase?: SupabaseClient<Database> }
  if (g.__gyf_supabase) return g.__gyf_supabase
  const config = useRuntimeConfig()
  g.__gyf_supabase = createClient<Database>(
    config.public.supabaseUrl,
    config.public.supabaseKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  )
  return g.__gyf_supabase
}

// 가구 관련 유틸리티
export const furniture = {
  // 모든 가구 가져오기
  async getAll(filters?: any, page = 1, limit = 12) {
    const supabase = createSupabaseClient()
    let query = supabase
      .from('furniture')
      .select('*')
      .order('created_at', { ascending: false })

    // 필터 적용
    if (filters) {
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
        query = query.eq('location', filters.location)
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
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('furniture')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // 가구 생성
  async create(furnitureData: any) {
    const supabase = createSupabaseClient()
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
    const supabase = createSupabaseClient()
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
    const supabase = createSupabaseClient()
    const { error } = await supabase
      .from('furniture')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // 비밀번호 검증 (비회원 수정/삭제용)
  async verifyPassword(id: string, password: string) {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('furniture')
      .select('password')
      .eq('id', id)
      .single()

    if (error) throw error
    
    // 비밀번호가 설정되어 있지 않은 경우 (회원 등록)
    if (!data.password) {
      return false
    }
    
    return data.password === password
  },

  // 비밀번호로 가구 업데이트 (비회원용)
  async updateWithPassword(id: string, password: string, furnitureData: any) {
    // 비밀번호 검증
    const isValid = await this.verifyPassword(id, password)
    if (!isValid) {
      throw new Error('비밀번호가 일치하지 않습니다.')
    }

    // 업데이트 실행
    return await this.update(id, furnitureData)
  },

  // 비밀번호로 가구 삭제 (비회원용)
  async deleteWithPassword(id: string, password: string) {
    // 비밀번호 검증
    const isValid = await this.verifyPassword(id, password)
    if (!isValid) {
      throw new Error('비밀번호가 일치하지 않습니다.')
    }

    // 삭제 실행
    return await this.delete(id)
  }
}

// 파일 업로드 유틸리티
export const storage = {
  // 이미지 업로드
  async uploadImage(file: File, path: string) {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase.storage
      .from('furniture-images')
      .upload(path, file)

    if (error) throw error
    return data
  },

  // 이미지 URL 가져오기
  getImageUrl(path: string) {
    const supabase = createSupabaseClient()
    const { data } = supabase.storage
      .from('furniture-images')
      .getPublicUrl(path)

    return data.publicUrl
  },

  // 이미지 삭제
  async deleteImage(path: string) {
    const supabase = createSupabaseClient()
    const { error } = await supabase.storage
      .from('furniture-images')
      .remove([path])

    if (error) throw error
  },

  // 문의 첨부파일 업로드
  async uploadContactAttachment(file: File, path: string) {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase.storage
      .from('contact-attachments')
      .upload(path, file)

    if (error) throw error
    return data
  },

  // 문의 첨부파일 URL 가져오기
  getContactAttachmentUrl(path: string) {
    const supabase = createSupabaseClient()
    const { data } = supabase.storage
      .from('contact-attachments')
      .getPublicUrl(path)

    return data.publicUrl
  },

  // 문의 첨부파일 삭제
  async deleteContactAttachment(path: string) {
    const supabase = createSupabaseClient()
    const { error } = await supabase.storage
      .from('contact-attachments')
      .remove([path])

    if (error) throw error
  }
}

// 문의 관련 유틸리티
export const contact = {
  // 문의 생성
  async create(contactData: any) {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('contacts')
      .insert(contactData)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // 모든 문의 가져오기 (관리자용)
  async getAll(page = 1, limit = 20) {
    const supabase = createSupabaseClient()
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('contacts')
      .select(`
        *,
        attachments:contact_attachments(*)
      `)
      .order('created_at', { ascending: false })
      .range(from, to)

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

  // 단일 문의 가져오기
  async getById(id: string) {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('contacts')
      .select(`
        *,
        attachments:contact_attachments(*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // 문의 상태 업데이트
  async updateStatus(id: string, status: string) {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('contacts')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // 첨부파일 정보 저장
  async saveAttachment(attachmentData: any) {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('contact_attachments')
      .insert(attachmentData)
      .select()
      .single()

    if (error) throw error
    return data
  }
}
