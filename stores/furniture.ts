import { defineStore } from 'pinia'
import { furniture } from '~/utils/supabase'
import type { Furniture, Category, SearchFilters, Pagination } from '~/types'

export const useFurnitureStore = defineStore('furniture', () => {
  const furnitureList = ref<Furniture[]>([])
  const currentFurniture = ref<Furniture | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref<Pagination>({
    page: 1,
    limit: 12,
    total: 0,
    total_pages: 0
  })

  // 카테고리 데이터 (하드코딩)
  const categoriesList = ref<Category[]>([
    { id: 'cat-1', name: '침대' },
    { id: 'cat-2', name: '책상/식탁' },
    { id: 'cat-3', name: '전자제품' },
    { id: 'cat-4', name: '기타' }
  ])

  // 모든 가구 가져오기
  const getAllFurniture = async (filters?: SearchFilters, page = 1) => {
    try {
      loading.value = true
      error.value = null
      const result = await furniture.getAll(filters, page, pagination.value.limit)
      furnitureList.value = result.data
      pagination.value = result.pagination
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // 단일 가구 가져오기
  const getFurnitureById = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      const result = await furniture.getById(id)
      currentFurniture.value = result
      return result
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // 가구 생성
  const createFurniture = async (furnitureData: any) => {
    try {
      loading.value = true
      error.value = null
      const result = await furniture.create(furnitureData)
      furnitureList.value.unshift(result)
      return result
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // 가구 업데이트
  const updateFurniture = async (id: string, furnitureData: any) => {
    try {
      loading.value = true
      error.value = null
      const result = await furniture.update(id, furnitureData)
      
      // 리스트에서 업데이트
      const index = furnitureList.value.findIndex(item => item.id === id)
      if (index !== -1) {
        furnitureList.value[index] = result
      }
      
      // 현재 가구가 업데이트된 가구라면 업데이트
      if (currentFurniture.value?.id === id) {
        currentFurniture.value = result
      }
      
      return result
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // 가구 삭제
  const deleteFurniture = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      await furniture.delete(id)
      
      // 리스트에서 제거
      furnitureList.value = furnitureList.value.filter(item => item.id !== id)
      
      // 현재 가구가 삭제된 가구라면 초기화
      if (currentFurniture.value?.id === id) {
        currentFurniture.value = null
      }
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

  // 현재 가구 초기화
  const clearCurrentFurniture = () => {
    currentFurniture.value = null
  }

  return {
    furnitureList: readonly(furnitureList),
    categoriesList: readonly(categoriesList),
    currentFurniture: readonly(currentFurniture),
    loading: readonly(loading),
    error: readonly(error),
    pagination: readonly(pagination),
    getAllFurniture,
    getFurnitureById,
    createFurniture,
    updateFurniture,
    deleteFurniture,
    clearError,
    clearCurrentFurniture
  }
})
