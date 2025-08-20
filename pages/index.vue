<template>
  <div>
    <!-- 히어로 섹션 -->
    <section class="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            중고가구 거래의<br>
            <span class="text-yellow-300">새로운 경험</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-primary-100">
            안전하고 편리한 중고가구 거래 플랫폼<br>
            믿을 수 있는 판매자와 구매자를 연결합니다
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/furniture"
              class="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              가구 찾기
            </NuxtLink>
            <NuxtLink
              to="/furniture/create"
              class="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              판매하기
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 특징 섹션 -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            왜 Get Your Furniture인가요?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            안전하고 신뢰할 수 있는 중고가구 거래를 위한 특별한 서비스
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              안전한 거래
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              검증된 사용자와 안전한 결제 시스템으로 
              걱정 없는 거래를 경험하세요
            </p>
          </div>

          <div class="text-center">
            <div class="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              지역 기반 매칭
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              가까운 지역의 판매자와 구매자를 연결하여 
              편리한 거래를 도와드립니다
            </p>
          </div>

          <div class="text-center">
            <div class="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              지속 가능한 소비
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              중고가구 거래로 환경 보호에 기여하고 
              경제적인 소비를 실현하세요
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 최신 가구 섹션 -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            최신 등록 가구
          </h2>
          <NuxtLink
            to="/furniture"
            class="text-primary-600 hover:text-primary-700 font-semibold"
          >
            더 보기 →
          </NuxtLink>
        </div>

        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="i" class="animate-pulse">
            <div class="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
            <div class="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2"></div>
            <div class="bg-gray-200 dark:bg-gray-700 h-4 rounded w-2/3"></div>
          </div>
        </div>

        <div v-else-if="furnitureList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FurnitureCard
            v-for="item in furnitureList.slice(0, 8)"
            :key="item.id"
            :furniture="item"
          />
        </div>

        <div v-else class="text-center py-12">
          <svg class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <p class="text-gray-500 dark:text-gray-400">
            아직 등록된 가구가 없습니다.
          </p>
        </div>
      </div>
    </section>

    <!-- 카테고리 섹션 -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            카테고리별 찾기
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            원하는 카테고리에서 가구를 찾아보세요
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <NuxtLink
            v-for="category in categoriesList"
            :key="category.id"
            :to="`/furniture?category=${category.id}`"
            class="group p-4 text-center rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
          >
            <div class="bg-primary-100 dark:bg-primary-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
              <svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
              {{ category.name }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO 설정
useHead({
  title: 'Get Your Furniture - 중고가구 거래 플랫폼',
  meta: [
    { name: 'description', content: '안전하고 편리한 중고가구 거래 플랫폼입니다. 믿을 수 있는 판매자와 구매자를 연결하여 지속 가능한 소비를 도와드립니다.' }
  ]
})

const furnitureStore = useFurnitureStore()
const { furnitureList, categoriesList, loading } = storeToRefs(furnitureStore)

// 페이지 로드 시 데이터 가져오기
onMounted(async () => {
  try {
    await Promise.all([
      furnitureStore.getAllFurniture({ is_sold: false }, 1),
      furnitureStore.getAllCategories()
    ])
  } catch (error) {
    console.error('데이터 로드 실패:', error)
  }
})
</script>
