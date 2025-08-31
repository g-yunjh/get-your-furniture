<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white font-sans">
    <!-- 전역 레이아웃의 AppHeader 사용 (중복 제거) -->

    <!-- 메인 콘텐츠 -->
    <div class="px-4 py-6 sm:px-6 lg:px-8">
      <!-- 히어로 섹션 -->
      <div class="text-center mb-8 sm:mb-12">
        <div class="mb-4">
          <span class="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-4 shadow-lg border border-white/30">
            ✨ 새로운 중고가구 경험
          </span>
        </div>
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent leading-tight">
          Get your furniture,<br>
          <span class="text-white drop-shadow-lg">get your future!</span>
        </h1>
        <p class="text-2xl sm:text-3xl font-black text-white/90 mb-6">가져가구</p>
        
        <!-- 위치 정보 -->
        <div class="flex items-center justify-center mb-4">
          <div class="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/30">
            <div class="flex items-center space-x-4">
              <svg class="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-lg font-bold text-white">어디에서 가구가 필요하신가요?</span>
            </div>
          </div>
        </div>

        <!-- 연결선 -->
        <div class="flex justify-center mb-4">
          <div class="w-px h-3 bg-white/30"></div>
        </div>

        <!-- 지역 선택 버튼 -->
        <div class="flex justify-center mb-8">
          <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/30">
            <div class="flex space-x-2">
              <button 
                @click="selectLocation('insa')"
                :class="[
                  'px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2',
                  selectedLocation === 'insa'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/20'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
                <span>명륜</span>
              </button>
              <button 
                @click="selectLocation('jagwa')"
                :class="[
                  'px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2',
                  selectedLocation === 'jagwa'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/20'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
                <span>율전</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 검색 및 필터 -->
      <div class="mb-8">
        <div class="max-w-4xl mx-auto">
          <!-- 검색바 -->
          <div class="relative mb-6">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="검색어를 입력해주세요"
              class="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <!-- 지역 필터 -->
          <div class="flex flex-wrap gap-3 justify-center">
            <button 
              @click="selectLocation('insa')"
              :class="[
                'px-6 py-3 rounded-xl font-semibold transition-all duration-300',
                selectedLocation === 'insa' 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg' 
                  : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
              ]"
            >
              인사동
            </button>
            <button 
              @click="selectLocation('jagwa')"
              :class="[
                'px-6 py-3 rounded-xl font-semibold transition-all duration-300',
                selectedLocation === 'jagwa' 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg' 
                  : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
              ]"
            >
              자과촌
            </button>
          </div>
        </div>
      </div>

      <!-- 상품 목록 -->
      <div id="furniture-list" class="mb-20">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-black text-white/90">
            {{ getLocationDisplayName() }} 상품
          </h2>
          <span class="text-white/70 text-sm font-semibold">{{ filteredFurniture.length }}개의 상품</span>
        </div>

        <!-- 로딩 상태 -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="i in 8" :key="i" class="bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden">
            <div class="aspect-square bg-white/20"></div>
            <div class="p-4">
              <div class="h-4 bg-white/20 rounded mb-3"></div>
              <div class="h-6 bg-white/20 rounded mb-2"></div>
              <div class="h-3 bg-white/20 rounded w-2/3"></div>
            </div>
          </div>
        </div>

        <!-- 실제 상품 목록 -->
        <div v-else-if="filteredFurniture.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div 
            v-for="item in filteredFurniture" 
            :key="item.id"
            class="group bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border border-white/30"
            @click="goToDetail(item.id)"
          >
            <div class="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
              <img 
                v-if="item.images && item.images.length > 0"
                :src="item.images[0]" 
                :alt="item.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              
              <!-- 가격 배지 -->
              <div class="absolute top-3 left-3">
                <span class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-black shadow-lg">
                  {{ formatPrice(item.price) }}원
                </span>
              </div>

              <!-- 상태 배지 -->
              <div class="absolute top-3 right-3">
                <span class="bg-white/90 text-gray-900 px-2 py-1 rounded-full text-xs font-black">
                  {{ getConditionText(item.condition) }}
                </span>
              </div>
            </div>
            
            <div class="p-4">
              <h3 class="font-black text-white mb-2 text-lg line-clamp-2 group-hover:text-yellow-300 transition-colors">
                {{ item.title }}
              </h3>
              <p class="text-white/70 text-sm mb-3 line-clamp-2 font-medium">{{ item.description }}</p>
              
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center space-x-2 text-white/60">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span class="font-semibold">{{ formatLocation(item.location) }}</span>
                </div>
                <span class="text-white/60 font-semibold">{{ formatTimeAgo(item.created_at) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 빈 상태 -->
        <div v-else class="text-center py-16">
          <div class="bg-white/20 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto">
            <div class="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-black text-white mb-2">
              {{ selectedLocation ? `${getLocationDisplayName().trim()}에 등록된 상품이 없습니다` : '상품이 없습니다' }}
            </h3>
            <p class="text-white/70 mb-6 font-medium">
              {{ selectedLocation ? `${getLocationDisplayName().trim()}에서 첫 번째 상품을 등록해보세요!` : '첫 번째 상품을 등록해보세요!' }}
            </p>
            <button 
              @click="goToCreate"
              class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-black hover:from-yellow-500 hover:to-orange-600 transition-colors"
            >
              상품 등록하기
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 플로팅 액션 버튼 -->
    <div class="fixed bottom-6 right-6 z-50">
      <button 
        class="group bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center hover:from-yellow-500 hover:to-orange-600 transition-colors"
        @click="goToCreate"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO 설정
useHead({
  title: '가져가구 - 중고가구 거래 플랫폼',
  meta: [
    { name: 'description', content: '필요한 것만, 가져가구. 안전하고 편리한 중고가구 거래 플랫폼입니다.' }
  ]
})

// 상태 관리
const searchQuery = ref('')
const selectedLocation = ref<'insa' | 'jagwa' | null>(null)

// 스토어 사용
const furnitureStore = useFurnitureStore()
const { furnitureList, loading } = storeToRefs(furnitureStore)

// 필터링된 상품 목록
const filteredFurniture = computed(() => {
  let filtered = furnitureList.value

  // 지역 필터
  if (selectedLocation.value) {
    filtered = filtered.filter(item => item.location === selectedLocation.value)
  }

  // 검색 필터
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    )
  }

  return filtered
})

// 지역 선택
const selectLocation = (location: 'insa' | 'jagwa') => {
  selectedLocation.value = selectedLocation.value === location ? null : location
}

// 가격 포맷팅
const formatPrice = (price: number) => {
  return price.toLocaleString()
}

// 시간 포맷팅
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffMinutes = Math.ceil(diffTime / (1000 * 60))
  
  if (diffMinutes < 60) return `${diffMinutes}분 전`
  if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}시간 전`
  if (diffMinutes < 10080) return `${Math.floor(diffMinutes / 1440)}일 전`
  return `${Math.floor(diffMinutes / 10080)}주 전`
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

// 페이지 이동
const router = useRouter()

const goToDetail = (id: string) => {
  router.push(`/furniture/${id}`)
}

const goToCreate = () => {
  router.push('/furniture/create')
}

// 페이지 로드 시 데이터 가져오기
onMounted(async () => {
  try {
    await Promise.all([
      furnitureStore.getAllFurniture({ is_sold: false }, 1),
      // furnitureStore.getAllCategories() // 카테고리 데이터는 하드코딩으로 변경되었으므로 제거
    ])
  } catch (error) {
    console.error('데이터 로드 실패:', error)
  }
})

// 위치 포맷팅
const formatLocation = (location: string) => {
  const locations = {
    insa: '명륜',
    jagwa: '율전'
  }
  return locations[location as keyof typeof locations] || location
}

// 지역 표시 이름 가져오기
const getLocationDisplayName = () => {
  if (selectedLocation.value === 'insa') {
    return '명륜 '
  } else if (selectedLocation.value === 'jagwa') {
    return '율전 '
  }
  return ''
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 커스텀 스크롤바 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #fbbf24, #f97316);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #f59e0b, #ea580c);
}
</style>
