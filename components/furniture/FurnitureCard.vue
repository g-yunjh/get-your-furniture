<template>
  <div class="card overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <!-- 이미지 -->
    <div class="relative aspect-square overflow-hidden">
      <img
        v-if="furniture.images && furniture.images.length > 0"
        :src="furniture.images[0]"
        :alt="furniture.title"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
      <div v-else class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <svg class="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
      
      <!-- 판매 상태 배지 -->
      <div v-if="furniture.is_sold" class="absolute top-2 right-2">
        <span class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          판매완료
        </span>
      </div>
      
      <!-- 가격 배지 -->
      <div class="absolute bottom-2 left-2">
        <span class="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-semibold">
          {{ formatPrice(furniture.price) }}원
        </span>
      </div>
    </div>

    <!-- 내용 -->
    <div class="p-4">
      <!-- 제목 -->
      <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {{ furniture.title }}
      </h3>
      
      <!-- 설명 -->
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
        {{ furniture.description }}
      </p>
      
      <!-- 메타 정보 -->
      <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
        <div class="flex items-center space-x-2">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>{{ formatLocation(furniture.location) }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span>{{ formatDate(furniture.created_at) }}</span>
        </div>
      </div>
      
      <!-- 상태 및 카테고리 -->
      <div class="flex items-center justify-between">
        <span class="text-xs px-2 py-1 rounded-full" :class="getConditionClass(furniture.condition)">
          {{ getConditionText(furniture.condition) }}
        </span>
        <span v-if="furniture.category" class="text-xs text-gray-500 dark:text-gray-400">
          {{ furniture.category.name }}
        </span>
      </div>
      
      <!-- 판매자 정보 -->
      <div v-if="furniture.seller" class="flex items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-2">
          <img
            v-if="furniture.seller.avatar_url"
            :src="furniture.seller.avatar_url"
            :alt="furniture.seller.name"
            class="w-6 h-6 rounded-full"
          />
          <div v-else class="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
            <span class="text-white text-xs font-medium">
              {{ furniture.seller.name?.charAt(0).toUpperCase() || 'U' }}
            </span>
          </div>
          <span class="text-sm text-gray-700 dark:text-gray-300">
            {{ furniture.seller.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- 호버 오버레이 -->
    <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
      <NuxtLink
        :to="`/furniture/${furniture.id}`"
        class="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
      >
        자세히 보기
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Furniture } from '~/types'

interface Props {
  furniture: Furniture
}

defineProps<Props>()

// 가격 포맷팅
const formatPrice = (price: number) => {
  return price.toLocaleString()
}

// 날짜 포맷팅
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return '오늘'
  if (diffDays <= 7) return `${diffDays}일 전`
  if (diffDays <= 30) return `${Math.floor(diffDays / 7)}주 전`
  if (diffDays <= 365) return `${Math.floor(diffDays / 30)}개월 전`
  return `${Math.floor(diffDays / 365)}년 전`
}

// 상태별 클래스
const getConditionClass = (condition: string) => {
  const classes = {
    new: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    like_new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    good: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    fair: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    poor: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[condition as keyof typeof classes] || classes.good
}

// 상태별 텍스트
const getConditionText = (condition: string) => {
  const texts = {
    new: '새상품',
    like_new: '거의 새상품',
    good: '양호',
    fair: '보통',
    poor: '하자있음'
  }
  return texts[condition as keyof typeof texts] || '양호'
}

// 위치 포맷팅
const formatLocation = (location: string) => {
  const locations = {
    insa: '명륜',
    jagwa: '율전'
  }
  return locations[location as keyof typeof locations] || location
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
