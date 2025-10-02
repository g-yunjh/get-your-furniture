<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" @click="closeModal">
    <div class="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center p-4">
      <!-- 닫기 버튼 -->
      <button
        @click="closeModal"
        class="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- 이미지 컨테이너 -->
      <div class="relative w-full h-full flex items-center justify-center" @click.stop>
        <img
          :src="currentImage"
          :alt="alt"
          class="max-w-full max-h-full object-contain"
          @load="onImageLoad"
        />
      </div>

      <!-- 네비게이션 버튼 (여러 이미지가 있을 때만) -->
      <template v-if="images && images.length > 1">
        <!-- 이전 버튼 -->
        <button
          @click.stop="previousImage"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <!-- 다음 버튼 -->
        <button
          @click.stop="nextImage"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>


        <!-- 이미지 카운터 -->
        <div class="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {{ currentImageIndex + 1 }} / {{ images.length }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  images: string[]
  initialIndex?: number
  alt?: string
}

interface Emits {
  (e: 'close'): void
  (e: 'update:currentIndex', index: number): void
}

const props = withDefaults(defineProps<Props>(), {
  initialIndex: 0,
  alt: ''
})

const emit = defineEmits<Emits>()

const currentImageIndex = ref(props.initialIndex)

// 현재 이미지
const currentImage = computed(() => {
  if (!props.images || props.images.length === 0) return ''
  return props.images[currentImageIndex.value]
})

// 이미지 네비게이션 (모달 내에서만 변경, 부모에게 알리지 않음)
const nextImage = () => {
  if (!props.images || props.images.length <= 1) return
  currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length
}

const previousImage = () => {
  if (!props.images || props.images.length <= 1) return
  currentImageIndex.value = currentImageIndex.value === 0 
    ? props.images.length - 1 
    : currentImageIndex.value - 1
}


// 모달 닫기
const closeModal = () => {
  // 모달이 닫힐 때 현재 이미지 인덱스를 부모에게 알림
  emit('update:currentIndex', currentImageIndex.value)
  emit('close')
}

// 이미지 로드 완료
const onImageLoad = () => {
  // 이미지 로드 완료 시 필요한 작업이 있다면 여기에 추가
}

// 키보드 이벤트 처리
const handleKeydown = (e: KeyboardEvent) => {
  if (!props.isOpen) return
  
  switch (e.key) {
    case 'Escape':
      closeModal()
      break
    case 'ArrowLeft':
      previousImage()
      break
    case 'ArrowRight':
      nextImage()
      break
  }
}

// props 변경 시 currentImageIndex 업데이트
watch(() => props.initialIndex, (newIndex) => {
  currentImageIndex.value = newIndex
})

// 모달이 열릴 때 키보드 이벤트 리스너 추가
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleKeydown)
    // 스크롤 방지
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    // 스크롤 복원
    document.body.style.overflow = ''
  }
})

// 컴포넌트 언마운트 시 정리
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>
