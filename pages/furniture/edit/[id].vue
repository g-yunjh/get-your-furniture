<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
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

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">이미지 업로드</h2>

            <div v-if="form.images.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div
                v-for="(image, index) in form.images"
                :key="index"
                class="relative aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden"
              >
                <img :src="image" :alt="`이미지 ${index + 1}`" class="w-full h-full object-cover" />
                <button @click="removeImage(index)" type="button" class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 xs:p-6 md:p-8 text-center">
              <input ref="fileInput" type="file" multiple accept="image/*" @change="handleImageUpload" class="hidden" />
              <button @click="$refs.fileInput.click()" type="button" class="inline-flex items-center px-4 xs:px-6 py-2 xs:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm xs:text-base">
                <svg class="w-4 h-4 xs:w-5 xs:h-5 mr-1 xs:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                이미지 추가
              </button>
              <p class="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mt-3">{{ form.images.length }}/10 - 최대 10장까지 업로드 가능합니다</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">첫 번째 이미지가 대표 이미지로 사용됩니다</p>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">기본 정보</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">제목 *</label>
                <input v-model="form.title" type="text" required class="w-full px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm" placeholder="게시글 제목" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">가격 (원) *</label>
                <input v-model.number="form.price" type="number" required min="0" class="w-full px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm" placeholder="0" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">상태 *</label>
                <select v-model="form.condition" required class="w-full px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm">
                  <option value="">상태 선택</option>
                  <option value="new">새상품</option>
                  <option value="like_new">거의 새상품</option>
                  <option value="good">좋음</option>
                  <option value="fair">보통</option>
                  <option value="poor">나쁨</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">판매 지역 *</label>
                <div class="flex space-x-2">
                  <button @click="form.location = 'insa'" type="button" :class="['flex-1 px-4 py-2 rounded-lg font-medium transition-colors', form.location === 'insa' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300']">인사캠</button>
                  <button @click="form.location = 'jagwa'" type="button" :class="['flex-1 px-4 py-2 rounded-lg font-medium transition-colors', form.location === 'jagwa' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300']">자과캠</button>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">자세한 설명</h2>
            <textarea v-model="form.description" required rows="6" class="w-full px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm" placeholder="가구 상태, 크기 등 상세 설명"></textarea>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">판매자 정보</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">전화번호 *</label>
                <input v-model="form.seller_phone" type="tel" required class="w-full px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm" placeholder="연락처" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">카카오톡 오픈채팅방 링크 (선택사항)</label>
                <input v-model="form.chat_link" type="url" class="w-full px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm" placeholder="채팅방 링크 (선택사항)" />
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-4">
            <button type="button" @click="goBack" class="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors">취소</button>
            <button type="submit" :disabled="submitting" class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">{{ submitting ? '수정 중...' : '수정 완료' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UpdateFurniture } from '~/types'

const route = useRoute()
const router = useRouter()
const furnitureStore = useFurnitureStore()

const submitting = ref(false)

const goBack = () => {
  router.back()
}

const form = ref<UpdateFurniture>({
  title: '',
  description: '',
  price: 0,
  condition: 'good',
  location: 'insa',
  images: [],
  seller_phone: '',
  chat_link: ''
})

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files) return
  if ((form.value.images?.length || 0) + files.length > 10) {
    alert('이미지는 최대 10장까지 업로드 가능합니다.')
    return
  }
  Array.from(files).forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (result) {
        if (!form.value.images) form.value.images = []
        form.value.images.push(result)
      }
    }
    reader.readAsDataURL(file)
  })
  target.value = ''
}

const removeImage = (index: number) => {
  if (!form.value.images) return
  form.value.images.splice(index, 1)
}

const loadData = async () => {
  try {
    const id = route.params.id as string
    const data = await furnitureStore.getFurnitureById(id)
    form.value = {
      title: data.title,
      description: data.description,
      price: data.price,
      condition: data.condition,
      location: data.location,
      images: data.images ? [...data.images] : [],
      seller_phone: data.seller_phone,
      chat_link: data.chat_link || ''
    }
  } catch (err: any) {
    alert(err.message || '데이터를 불러오지 못했습니다.')
    router.push('/')
  }
}

onMounted(() => {
  loadData()
})

const handleSubmit = async () => {
  const id = route.params.id as string
  try {
    submitting.value = true
    let password: string | null = null
    if (process.client) password = sessionStorage.getItem(`edit_pw_${id}`)
    if (!password) {
      alert('수정을 위해 비밀번호 확인이 필요합니다. 상세 페이지에서 다시 시도해주세요.')
      await router.push(`/furniture/${id}`)
      return
    }
    if (!form.value.title || !form.value.description || form.value.price === undefined || !form.value.condition || !form.value.location || !form.value.seller_phone) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }
    await furnitureStore.updateFurnitureWithPassword(id, password, {
      ...form.value,
      updated_at: new Date().toISOString()
    })
    if (process.client) sessionStorage.removeItem(`edit_pw_${id}`)
    alert('수정이 완료되었습니다.')
    await router.push(`/furniture/${id}`)
  } catch (err: any) {
    alert(err.message || '수정 중 오류가 발생했습니다.')
  } finally {
    submitting.value = false
  }
}
</script>


