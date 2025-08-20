import { defineStore } from 'pinia'
import { auth } from '~/utils/supabase'
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 현재 사용자 가져오기
  const getCurrentUser = async () => {
    try {
      loading.value = true
      error.value = null
      const currentUser = await auth.getCurrentUser()
      user.value = currentUser
    } catch (err: any) {
      error.value = err.message
      user.value = null
    } finally {
      loading.value = false
    }
  }

  // 로그인
  const signIn = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      const { user: authUser } = await auth.signIn(email, password)
      user.value = authUser
      return authUser
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // 회원가입
  const signUp = async (email: string, password: string, name: string) => {
    try {
      loading.value = true
      error.value = null
      const { user: authUser } = await auth.signUp(email, password, name)
      user.value = authUser
      return authUser
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // 로그아웃
  const signOut = async () => {
    try {
      loading.value = true
      error.value = null
      await auth.signOut()
      user.value = null
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // 비밀번호 재설정
  const resetPassword = async (email: string) => {
    try {
      loading.value = true
      error.value = null
      await auth.resetPassword(email)
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // 에러 초기화
  const clearError = () => {
    error.value = null
  }

  return {
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    getCurrentUser,
    signIn,
    signUp,
    signOut,
    resetPassword,
    clearError
  }
})
