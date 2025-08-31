<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 로딩 상태 -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">오류가 발생했습니다</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">{{ error }}</p>
        <NuxtLink to="/" class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          홈으로 돌아가기
        </NuxtLink>
      </div>
    </div>

    <!-- 제품 상세 내용 -->
    <div v-else-if="furniture" class="container mx-auto px-4 py-8">
      <!-- 뒤로가기 버튼 -->
      <div class="mb-6">
        <button @click="$router.back()" class="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          뒤로가기
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 왼쪽: 이미지 섹션 -->
        <div class="lg:col-span-2">
          <!-- 이미지 캐러셀 -->
          <div class="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div class="relative aspect-square">
              <img
                v-if="furniture.images && furniture.images.length > 0"
                :src="currentImage"
                :alt="furniture.title"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <svg class="h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>

              <!-- 이미지 네비게이션 -->
              <div v-if="furniture.images && furniture.images.length > 1" class="absolute inset-0 flex items-center justify-between p-4">
                <button
                  @click="previousImage"
                  class="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button
                  @click="nextImage"
                  class="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>

              <!-- 판매 상태 배지 -->
              <div v-if="furniture.is_sold" class="absolute top-4 right-4">
                <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  판매완료
                </span>
              </div>
            </div>

            <!-- 이미지 인디케이터 -->
            <div v-if="furniture.images && furniture.images.length > 1" class="flex justify-center space-x-2 p-4">
              <button
                v-for="(image, index) in furniture.images"
                :key="index"
                @click="currentImageIndex = index"
                :class="[
                  'w-3 h-3 rounded-full transition-all',
                  currentImageIndex === index ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                ]"
              ></button>
            </div>
          </div>
        </div>

        <!-- 오른쪽: 제품 정보 섹션 -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ furniture.title }}</h1>
            <span class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ formatPrice(furniture.price) }}원</span>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
              {{ getConditionText(furniture.condition) }}
            </span>
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
              {{ getLocationText(furniture.location) }}
            </span>
          </div>
          
          <div class="text-gray-600 dark:text-gray-400">
            <p class="whitespace-pre-wrap">{{ furniture.description }}</p>
          </div>

          <!-- 채팅 버튼 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <button
              v-if="furniture.chat_link"
              @click="openChat"
              class="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              채팅 보내기
            </button>
            <button
              v-else
              @click="showContactModal = true"
              class="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              연락하기
            </button>
          </div>

          <!-- 판매자 정보 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">판매자 정보</h3>
            <div class="space-y-2">
              <p class="text-gray-700 dark:text-gray-300">
                <span class="font-medium">이름:</span> {{ furniture.seller_name }}
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                <span class="font-medium">연락처:</span> {{ furniture.seller_phone }}
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                <span class="font-medium">위치:</span> {{ getLocationText(furniture.location) }}
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                <span class="font-medium">등록일:</span> {{ formatTimeAgo(furniture.created_at) }}
              </p>
            </div>
          </div>

          <!-- 수정/삭제 버튼 (비밀번호 기반) -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">게시글 관리</h3>
            <div class="space-y-3">
              <button
                @click="handleEditClick"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                수정하기
              </button>
              <button
                @click="handleDeleteClick"
                class="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 비밀번호 입력 모달 -->
    <div v-if="showPasswordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ passwordModalType === 'edit' ? '수정' : '삭제' }}을 위해 비밀번호를 입력하세요
        </h3>
        <input
          v-model="password"
          type="password"
          placeholder="비밀번호"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white mb-4"
        />
        <div class="flex space-x-3">
          <button
            @click="confirmPasswordAction"
            class="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            확인
          </button>
          <button
            @click="closePasswordModal"
            class="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>

    <!-- 연락처 입력 모달 -->
    <div v-if="showContactModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">연락처 정보</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          판매자와 연락하기 위해 연락처 정보를 입력해주세요.
        </p>
        <input
          v-model="contactInfo.name"
          type="text"
          placeholder="이름"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white mb-3"
        />
        <input
          v-model="contactInfo.phone"
          type="tel"
          placeholder="전화번호"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white mb-4"
        />
        <div class="flex space-x-3">
          <button
            @click="submitContact"
            class="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            연락하기
          </button>
          <button
            @click="showContactModal = false"
            class="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Furniture } from '~/types'

const route = useRoute()
const router = useRouter()
const furnitureStore = useFurnitureStore()

// 상태 관리
const furniture = ref<Furniture | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const currentImageIndex = ref(0)

// 모달 상태
const showPasswordModal = ref(false)
const showContactModal = ref(false)
const passwordModalType = ref<'edit' | 'delete'>('edit')
const password = ref('')
const contactInfo = ref({
  name: '',
  phone: ''
})

// 현재 이미지
const currentImage = computed(() => {
  if (!furniture.value?.images || furniture.value.images.length === 0) return ''
  return furniture.value.images[currentImageIndex.value]
})

// 이미지 네비게이션
const nextImage = () => {
  if (!furniture.value?.images) return
  currentImageIndex.value = (currentImageIndex.value + 1) % furniture.value.images.length
}

const previousImage = () => {
  if (!furniture.value?.images) return
  currentImageIndex.value = currentImageIndex.value === 0 
    ? furniture.value.images.length - 1 
    : currentImageIndex.value - 1
}

// 가격 포맷팅
const formatPrice = (price: number) => {
  return price.toLocaleString()
}

// 시간 포맷팅
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분전`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}시간전`
  } else {
    return `${Math.floor(diffInMinutes / 1440)}일전`
  }
}

// 상태 텍스트
const getConditionText = (condition: string) => {
  const conditionMap = {
    new: '새상품',
    like_new: '거의 새상품',
    good: '좋음',
    fair: '보통',
    poor: '나쁨'
  }
  return conditionMap[condition as keyof typeof conditionMap] || condition
}

// 위치 텍스트
const getLocationText = (location: string) => {
  return location || '위치 미상'
}

// 채팅 열기
const openChat = () => {
  if (furniture.value?.chat_link) {
    window.open(furniture.value.chat_link, '_blank')
  }
}

// 비밀번호 모달 열기
const openPasswordModal = (type: 'edit' | 'delete') => {
  passwordModalType.value = type
  showPasswordModal.value = true
}

// 비밀번호 모달 닫기
const closePasswordModal = () => {
  showPasswordModal.value = false
  password.value = ''
}

// 비밀번호 확인 액션
const confirmPasswordAction = async () => {
  if (!furniture.value || !password.value) return

  try {
    if (passwordModalType.value === 'edit') {
      // 수정 페이지로 이동 (비밀번호를 쿼리 파라미터로 전달)
      await router.push(`/furniture/${furniture.value.id}/edit?password=${encodeURIComponent(password.value)}`)
    } else {
      // 삭제 실행
      await furnitureStore.deleteFurnitureWithPassword(furniture.value.id, password.value)
      await router.push('/')
    }
    closePasswordModal()
  } catch (err: any) {
    alert(err.message || '오류가 발생했습니다.')
  }
}

// 연락처 제출
const submitContact = () => {
  if (!contactInfo.value.name || !contactInfo.value.phone) {
    alert('이름과 전화번호를 모두 입력해주세요.')
    return
  }
  
  // 여기에 연락처 처리 로직 추가
  alert('연락처가 전송되었습니다.')
  showContactModal.value = false
  contactInfo.value = { name: '', phone: '' }
}

// 수정/삭제 모달 열기 함수들
const handleEditClick = () => {
  openPasswordModal('edit')
}

const handleDeleteClick = () => {
  openPasswordModal('delete')
}

// 데이터 로드
const loadFurniture = async () => {
  try {
    loading.value = true
    error.value = null
    const id = route.params.id as string
    const data = await furnitureStore.getFurnitureById(id)
    furniture.value = data
  } catch (err: any) {
    error.value = err.message || '제품을 불러오는데 실패했습니다.'
  } finally {
    loading.value = false
  }
}

// 페이지 로드 시 데이터 가져오기
onMounted(() => {
  loadFurniture()
})

// 키보드 이벤트 (이미지 네비게이션)
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (!furniture.value?.images || furniture.value.images.length <= 1) return
    
    if (e.key === 'ArrowLeft') {
      previousImage()
    } else if (e.key === 'ArrowRight') {
      nextImage()
    }
  }

  window.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})
</script>
