<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white">
      <div class="relative z-10 text-center max-w-3xl px-6 py-16">
        <h1 class="text-4xl sm:text-5xl font-extrabold mb-2 bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent drop-shadow break-keep">
          가져가구에게 문의하기
        </h1>
        <p class="text-white/90 leading-relaxed text-sm sm:text-base max-w-2xl mx-auto break-keep">
          궁금한 점이나 불편한 사항이 있으시면 언제든 문의해주세요<br>
          빠른 시일 내에 답변 드리겠습니다
        </p>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="max-w-2xl mx-auto px-6 py-16">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- 이름 -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              성함
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="고객님의 이름을 알려주세요"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            />
          </div>

          <!-- 이메일 -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              답변 받을 이메일 주소
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="답변 받을 이메일 주소"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            />
          </div>

          <!-- 문의 내용 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              문의 내용
            </label>
            <div class="space-y-3">
              <input
                v-model="form.subject"
                type="text"
                required
                placeholder="문의 제목"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
              />
              <textarea
                v-model="form.message"
                required
                rows="6"
                placeholder="문의 내용을 자세히 작성해주세요"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors resize-none"
              ></textarea>
            </div>
          </div>

          <!-- 첨부파일 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              첨부파일
            </label>
            <div class="relative">
              <input
                ref="fileInput"
                type="file"
                @change="handleFileChange"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                class="hidden"
              />
              <button
                type="button"
                @click="() => fileInput?.click()"
                class="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                </svg>
                <span class="text-gray-600 dark:text-gray-400">파일을 등록해주세요</span>
              </button>
            </div>
            
            <!-- 선택된 파일 목록 -->
            <div v-if="selectedFiles.length > 0" class="mt-3 space-y-2">
              <div
                v-for="(file, index) in selectedFiles"
                :key="index"
                class="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span class="text-sm text-gray-700">{{ file.name }}</span>
                </div>
                <button
                  type="button"
                  @click="removeFile(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- 제출 버튼 -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg v-if="isSubmitting" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ isSubmitting ? '전송 중...' : '작성 완료' }}</span>
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { contact, storage } from '~/utils/supabase'

useHead({
  title: '문의하기 - 가져가구',
  meta: [
    { name: 'description', content: '가져가구에 문의하세요. 궁금한 점이나 불편한 사항을 알려주시면 빠른 시일 내에 답변 드리겠습니다.' }
  ]
})

// Form data
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const selectedFiles = ref<File[]>([])
const isSubmitting = ref(false)
const fileInput = ref<HTMLInputElement>()

// File handling
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    const newFiles = Array.from(target.files)
    selectedFiles.value.push(...newFiles)
  }
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

// Form submission
const submitForm = async () => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  
  try {
    console.log('Submitting form with data:', {
      name: form.value.name,
      email: form.value.email,
      subject: form.value.subject,
      message: form.value.message
    })
    
    // 문의 데이터 생성
    const contactData = await contact.create({
      name: form.value.name,
      email: form.value.email,
      subject: form.value.subject,
      message: form.value.message,
      status: 'pending'
    })
    
    console.log('Contact created successfully:', contactData)

    // 파일 업로드 처리
    if (selectedFiles.value.length > 0) {
      for (const file of selectedFiles.value) {
        const fileName = `${contactData.id}/${Date.now()}_${file.name}`
        
        try {
          // 파일을 Supabase Storage에 업로드
          await storage.uploadContactAttachment(file, fileName)

          // 파일 정보를 데이터베이스에 저장
          await contact.saveAttachment({
            contact_id: contactData.id,
            file_name: file.name,
            file_path: fileName,
            file_size: file.size,
            file_type: file.type
          })
        } catch (uploadError) {
          console.error('File upload error:', uploadError)
          console.error('File details:', {
            name: file.name,
            size: file.size,
            type: file.type
          })
          continue
        }
      }
    }

    // 성공 메시지
    alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.')
    
    // 폼 초기화
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    selectedFiles.value = []
    if (fileInput.value) {
      fileInput.value.value = ''
    }

  } catch (error) {
    console.error('Contact submission error:', error)
    
    // 더 자세한 오류 정보 표시
    let errorMessage = '문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.'
    
    if (error && typeof error === 'object') {
      // Supabase 오류인 경우
      if ('message' in error) {
        errorMessage = `오류: ${(error as any).message}`
      }
      // 네트워크 오류인 경우
      if ('code' in error) {
        errorMessage = `네트워크 오류 (${(error as any).code}): ${(error as any).message || '연결에 실패했습니다.'}`
      }
    }
    
    alert(errorMessage)
  } finally {
    isSubmitting.value = false
  }
}
</script>
