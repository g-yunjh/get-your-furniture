<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero -->
    <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white">
      <!-- Floating shapes -->
      <div class="pointer-events-none absolute inset-0">
        <div ref="shape1" class="absolute w-20 h-20 rounded-full bg-white/10 top-1/5 left-10"></div>
        <div ref="shape2" class="absolute w-28 h-28 rounded-full bg-white/10 bottom-1/5 right-10"></div>
        <div ref="shape3" class="absolute w-16 h-16 rounded-full bg-white/10 bottom-10 left-1/5"></div>
      </div>

      <div class="relative z-10 text-center max-w-3xl px-6 pt-12 pb-8">
        <h1 class="text-4xl sm:text-5xl font-extrabold mb-2 bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent drop-shadow">
          가져가구
        </h1>
        <p class="text-lg sm:text-xl font-medium text-white/95 mb-3">중고 가구 순환 플랫폼</p>
        <p class="text-white/90 leading-relaxed text-sm sm:text-base mb-4 max-w-2xl mx-auto">
          쓰지 않는 가구를 간단히 등록하면, 필요한 사람이 쉽게 구매할 수 있습니다.<br>
          무겁고 번거로운 운반은 저희가 맡습니다. 고객님은 등록만 하시면 됩니다.
        </p>
        
      </div>
    </section>

    <!-- Features -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">왜 가져가구인가요?</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-observe class="card p-5 text-center transition-transform duration-300 hover:-translate-y-1">
          <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center text-2xl">📦</div>
          <h3 class="text-base font-semibold text-gray-900 mb-1.5">간편한 등록</h3>
          <p class="text-gray-600 leading-relaxed mx-auto max-w-[28ch] break-keep">복잡한 과정 없이 쓰지 않는 가구를 간단히 등록할 수 있습니다.</p>
        </div>
        <div v-observe class="card p-5 text-center transition-transform duration-300 hover:-translate-y-1">
          <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center text-2xl">🚚</div>
          <h3 class="text-base font-semibold text-gray-900 mb-1.5">배송 서비스</h3>
          <p class="text-gray-600 leading-relaxed mx-auto max-w-[28ch] break-keep">무겁고 번거로운 운반은 저희가 책임집니다. 걱정 없이 거래하세요.</p>
        </div>
        <div v-observe class="card p-5 text-center transition-transform duration-300 hover:-translate-y-1">
          <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center text-2xl">♻️</div>
          <h3 class="text-base font-semibold text-gray-900 mb-1.5">지속가능한 순환</h3>
          <p class="text-gray-600 leading-relaxed mx-auto max-w-[28ch] break-keep">아직 쓸 수 있는 가구들이 새로운 주인을 만나도록 돕습니다.</p>
        </div>
      </div>

      <div v-observe class="mt-10 bg-white rounded-2xl border border-gray-200 shadow-md p-6 text-center">
        <p class="text-gray-700 leading-relaxed max-w-3xl mx-auto">
          <span class="text-primary-700 font-semibold">가져가구</span>는 중고 가구 거래와 배송을 한 번에 해결하는 중고 가구 순환 플랫폼입니다.<br><br>
          저희는 복잡한 중고 거래 과정을 간소화하고, 아직 쓸 수 있는 가구들이 새로운 주인을 만나도록 돕습니다.<br><br>
          더 나은 환경을 위해, 더 편리한 거래를 위해 가져가구가 함께합니다.
        </p>
      </div>

      <p v-observe class="text-center text-lg sm:text-xl font-bold text-gray-900 mt-10">가구는 무겁지만, 거래는 가볍게.</p>
    </section>

    <!-- Final CTA -->
    <section class="bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 text-white">
      <div class="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 class="text-2xl sm:text-3xl font-extrabold mb-2">가져가구와 함께</h2>
        <p class="text-white/90 mb-6 text-sm sm:text-base">쉽고 똑똑한 순환을 시작하세요</p>
        <button @click="goToCreate" class="btn-primary px-5 py-2.5 rounded-xl shadow-lg text-sm sm:text-base">
          가져가구 시작하기
        </button>
      </div>
    </section>

  </div>
  
</template>

<script setup lang="ts">
useHead({
  title: '서비스 소개 - 가져가구',
  meta: [
    { name: 'description', content: '중고 가구 순환 플랫폼 가져가구 서비스 소개' }
  ]
})

const router = useRouter()
const goToCreate = () => router.push('/furniture/create')

// Floating shapes parallax
const shape1 = ref<HTMLElement | null>(null)
const shape2 = ref<HTMLElement | null>(null)
const shape3 = ref<HTMLElement | null>(null)

const onScroll = () => {
  const y = window.scrollY
  if (shape1.value) shape1.value.style.transform = `translateY(${y * 0.25}px)`
  if (shape2.value) shape2.value.style.transform = `translateY(${y * 0.35}px)`
  if (shape3.value) shape3.value.style.transform = `translateY(${y * 0.45}px)`
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

// Simple intersection observer directive for fade-in
const vObserve = {
  mounted(el: HTMLElement) {
    el.style.opacity = '0'
    el.style.transform = 'translateY(16px)'
    el.style.transition = 'opacity .6s ease, transform .6s ease'

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

    observer.observe(el)
  }
}

defineExpose({})
</script>

 

<style scoped>
.top-1\/5 { top: 20%; }
.left-1\/5 { left: 20%; }
</style>


