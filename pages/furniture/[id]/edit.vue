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

    <!-- 비밀번호 검증 모달 -->
    <div v-else-if="!passwordVerified && !furniture" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">수정을 위해 비밀번호를 입력하세요</h3>
        <input
          v-model="password"
          type="password"
          placeholder="비밀번호"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white mb-4"
          @keyup.enter="verifyPassword"
        />
        <div class="flex space-x-3">
          <button
            @click="verifyPassword"
            class="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            확인
          </button>
          <button
            @click="$router.back()"
            class="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>

    <!-- 수정 폼 -->
    <div v-else-if="furniture" class="container mx-auto px-4 py-8">
      <!-- 헤더 -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">제품 수정</h1>
          <button
            @click="$router.back()"
            class="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            뒤로가기
          </button>
        </div>
      </div>

      <!-- 수정 폼 -->
      <div class="max-w-4xl mx-auto">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- 기본 정보 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">기본 정보</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- 제목 -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  제목 *
                </label>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="올릴 게시글의 제목을 작성해주세요"
                />
              </div>

              <!-- 가격 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  가격 (원) *
                </label>
                <input
                  v-model.number="form.price"
                  type="number"
                  required
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="0"
                />
              </div>

              <!-- 상태 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  상태 *
                </label>
                <select
                  v-model="form.condition"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">상태 선택</option>
                  <option value="new">새상품</option>
                  <option value="like_new">거의 새상품</option>
                  <option value="good">좋음</option>
                  <option value="fair">보통</option>
                  <option value="poor">나쁨</option>
                </select>
              </div>

              <!-- 위치 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  위치 *
                </label>
                <input
                  v-model="form.location"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="예: 명륜, 율전"
                />
              </div>
            </div>
          </div>

          <!-- 설명 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">상품 설명</h2>
            <textarea
              v-model="form.description"
              required
              rows="6"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="상품에 대한 자세한 설명을 입력하세요"
            ></textarea>
          </div>

          <!-- 이미지 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">이미지</h2>
            
            <!-- 현재 이미지들 -->
            <div v-if="form.images.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div
                v-for="(image, index) in form.images"
                :key="index"
                class="relative aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden"
              >
                <img
                  :src="image"
                  :alt="`이미지 ${index + 1}`"
                  class="w-full h-full object-cover"
                />
                <button
                  @click="removeImage(index)"
                  class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- 이미지 업로드 -->
            <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <input
                ref="fileInput"
                type="file"
                multiple
                accept="image/*"
                @change="handleImageUpload"
                class="hidden"
              />
              <button
                @click="$refs.fileInput.click()"
                type="button"
                class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                이미지 추가
              </button>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                최대 5장까지 업로드 가능합니다
              </p>
            </div>
          </div>

          <!-- 연락처 정보 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">연락처 정보</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">


              <!-- 연락처 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  연락처
                </label>
                <input
                  v-model="form.seller_phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="전화번호"
                />
              </div>

              <!-- 채팅 링크 -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  채팅 링크 (선택사항)
                </label>
                <input
                  v-model="form.chat_link"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="카카오톡 오픈채팅방 링크 등"
                />
              </div>
            </div>
          </div>

          <!-- 판매 상태 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">판매 상태</h2>
            <div class="flex items-center">
              <input
                v-model="form.is_sold"
                type="checkbox"
                id="is_sold"
                class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="is_sold" class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                판매 완료로 표시
              </label>
            </div>
          </div>

          <!-- 제출 버튼 -->
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="$router.back()"
              class="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ submitting ? '수정 중...' : '수정 완료' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Furniture, CreateFurniture } from '~/types'

const route = useRoute()
const router = useRouter()
const furnitureStore = useFurnitureStore()

// 상태 관리
const furniture = ref<Furniture | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const passwordVerified = ref(false)
const submitting = ref(false)
const password = ref('')

// 폼 데이터
const form = ref<CreateFurniture>({
  title: '',
  description: '',
  price: 0,
  condition: 'good',
  location: '',
  images: [],
  seller_phone: '',
  chat_link: ''
})

// 카테고리 데이터
const categories = ref([
  { id: 'cat-1', name: '침대' },
  { id: 'cat-2', name: '책상/식탁' },
  { id: 'cat-3', name: '전자제품' },
  { id: 'cat-4', name: '기타' }
])

// 비밀번호 검증
const verifyPassword = async () => {
  if (!password.value) {
    alert('비밀번호를 입력해주세요.')
    return
  }

  try {
    const id = route.params.id as string
    const isValid = await furnitureStore.verifyPassword(id, password.value)
    
    if (isValid) {
      passwordVerified.value = true
      await loadFurniture()
    } else {
      alert('비밀번호가 일치하지 않습니다.')
    }
  } catch (err: any) {
    alert(err.message || '오류가 발생했습니다.')
  }
}

// 가구 데이터 로드
const loadFurniture = async () => {
  try {
    loading.value = true
    error.value = null
    const id = route.params.id as string
    const data = await furnitureStore.getFurnitureById(id)
    furniture.value = data
    
    // 폼 데이터 초기화
    form.value = {
      title: data.title,
      description: data.description,
      price: data.price,
      condition: data.condition,
      location: data.location,
      images: data.images || [],
      seller_phone: data.seller_phone || '',
      chat_link: data.chat_link || ''
    }
  } catch (err: any) {
    error.value = err.message || '제품을 불러오는데 실패했습니다.'
  } finally {
    loading.value = false
  }
}

// 이미지 업로드 처리
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  
  if (!files) return
  
  // 최대 5장 제한
  if (form.value.images.length + files.length > 5) {
    alert('이미지는 최대 5장까지 업로드 가능합니다.')
    return
  }
  
  // 파일을 URL로 변환
  Array.from(files).forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (result) {
        form.value.images.push(result)
      }
    }
    reader.readAsDataURL(file)
  })
  
  // 파일 입력 초기화
  target.value = ''
}

// 이미지 제거
const removeImage = (index: number) => {
  form.value.images.splice(index, 1)
}

// 폼 제출
const handleSubmit = async () => {
  try {
    submitting.value = true
    
    const id = route.params.id as string
    const storedPassword = route.query.password as string
    
    if (!storedPassword) {
      alert('비밀번호가 필요합니다.')
      return
    }
    
    await furnitureStore.updateFurnitureWithPassword(id, storedPassword, {
      ...form.value,
      updated_at: new Date().toISOString()
    })
    
    alert('제품이 성공적으로 수정되었습니다.')
    await router.push(`/furniture/${id}`)
  } catch (err: any) {
    alert(err.message || '수정 중 오류가 발생했습니다.')
  } finally {
    submitting.value = false
  }
}

// 페이지 로드 시 비밀번호 확인
onMounted(async () => {
  const storedPassword = route.query.password as string
  if (storedPassword) {
    password.value = storedPassword
    await verifyPassword()
  } else {
    loading.value = false
  }
})
</script>
