<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 헤더 -->
    <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-1 sm:py-4">
        <div class="flex items-center">
                     <button
             @click="goBack"
             class="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
           >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            뒤로가기
          </button>
        </div>
      </div>
    </div>

    <!-- 메인 폼 -->
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- 이미지 업로드 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">이미지 업로드</h2>
            
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
                  type="button"
                  class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- 이미지 업로드 영역 -->
            <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 xs:p-6 md:p-8 text-center">
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
                class="inline-flex items-center px-4 xs:px-6 py-2 xs:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm xs:text-base"
              >
                <svg class="w-4 h-4 xs:w-5 xs:h-5 mr-1 xs:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                이미지 추가
              </button>
              <p class="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mt-3">
                {{ form.images.length }}/10 - 최대 10장까지 업로드 가능합니다
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                첫 번째 이미지가 대표 이미지로 사용됩니다
              </p>
            </div>
          </div>

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
                   class="w-full px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                   placeholder="게시글 제목"
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
                   class="w-full px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                   placeholder="0"
                 />
                <div class="mt-2 text-xs text-red-500 space-y-1">
                  <p>• 해당 가격은 구매자가 실제로 지불할 금액입니다.</p>
                  <p>• 판매자가 받는 금액은 위 금액에서 배송 수수료를 제외한 금액입니다.</p>
                  <p>• 배송 수수료는 가구 무게와 크기, 거리 등에 따라 달리 책정됩니다.</p>
                </div>
               </div>

               <!-- 상태 -->
               <div>
                 <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   상태 *
                 </label>
                 <select
                   v-model="form.condition"
                   required
                   class="w-full px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                 >
                   <option value="">상태 선택</option>
                   <option value="new">새상품</option>
                   <option value="like_new">거의 새상품</option>
                   <option value="good">좋음</option>
                   <option value="fair">보통</option>
                   <option value="poor">나쁨</option>
                 </select>
               </div>

              <!-- 판매 지역 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  판매 지역 *
                </label>
                <div class="flex space-x-2">
                  <button
                    @click="form.location = 'insa'"
                    type="button"
                    :class="[
                      'flex-1 px-4 py-2 rounded-lg font-medium transition-colors',
                      form.location === 'insa' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    ]"
                  >
                    인사캠
                  </button>
                  <button
                    @click="form.location = 'jagwa'"
                    type="button"
                    :class="[
                      'flex-1 px-4 py-2 rounded-lg font-medium transition-colors',
                      form.location === 'jagwa' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    ]"
                  >
                    자과캠
                  </button>
                </div>
              </div>
            </div>
          </div>

                     <!-- 자세한 설명 -->
           <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
             <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">자세한 설명</h2>
             <textarea
               v-model="form.description"
               required
               rows="6"
               class="w-full px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
               placeholder="가구 상태, 크기 등 상세 설명"
             ></textarea>
           </div>

          <!-- 연락처 정보 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">판매자 정보</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <!-- 전화번호 -->
               <div>
                 <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   전화번호 *
                 </label>
                 <input
                   v-model="form.seller_phone"
                   type="tel"
                   required
                   class="w-full px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                   placeholder="연락처"
                 />
               </div>

                             <!-- 비밀번호 -->
               <div>
                 <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   비밀번호 *
                 </label>
                 <input
                   v-model="form.password"
                   type="password"
                   required
                   class="w-full px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                   placeholder="수정/삭제용 비밀번호"
                 />
                 <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                   나중에 글을 수정하거나 삭제할 때 필요합니다
                 </p>
               </div>

               <!-- 채팅 링크 -->
               <div class="md:col-span-2">
                 <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   카카오톡 오픈채팅방 링크 (선택사항)
                 </label>
                 <input
                   v-model="form.chat_link"
                   type="url"
                   class="w-full px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                   placeholder="채팅방 링크 (선택사항)"
                 />
                 <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                   구매자와의 소통을 위한 채팅방 링크를 입력해주세요
                 </p>
               </div>
            </div>
          </div>

          <!-- 제출 버튼 -->
          <div class="flex justify-end space-x-4">
                         <button
               type="button"
               @click="goBack"
               class="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
             >
               취소
             </button>
            <button
              type="submit"
              :disabled="submitting"
              class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ submitting ? '등록 중...' : '작성 완료' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CreateFurniture } from '~/types'

const router = useRouter()
const furnitureStore = useFurnitureStore()
// 페이지 타이틀
useHead({
  title: '등록하기'
})

// 상태 관리
const submitting = ref(false)

// 뒤로가기 함수
const goBack = () => {
  router.back()
}

// 폼 데이터
const form = ref<CreateFurniture>({
  title: '',
  description: '',
  price: 0,
  condition: 'good',
  location: 'insa',
  images: [],
  seller_phone: '',
  password: '',
  chat_link: ''
})

// 이미지 업로드 처리
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  
  if (!files) return
  
  // 최대 10장 제한
  if (form.value.images.length + files.length > 10) {
    alert('이미지는 최대 10장까지 업로드 가능합니다.')
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
    
    // 필수 필드 검증
    if (!form.value.title || !form.value.description || !form.value.price || 
        !form.value.condition || !form.value.location ||
        !form.value.seller_phone || !form.value.password) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }

    if (form.value.images.length === 0) {
      alert('최소 1장의 이미지를 업로드해주세요.')
      return
    }

    // 가구 등록
    const result = await furnitureStore.createFurniture({
      ...form.value,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    
    alert('가구가 성공적으로 등록되었습니다!')
    await router.push(`/furniture/${result.id}`)
  } catch (err: any) {
    alert(err.message || '등록 중 오류가 발생했습니다.')
  } finally {
    submitting.value = false
  }
}
</script>
