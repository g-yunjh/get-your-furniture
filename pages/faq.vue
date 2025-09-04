<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero -->
    <section class="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white">
      <div class="relative z-10 text-center max-w-3xl px-6 py-16">
        <h1 class="text-4xl sm:text-5xl font-extrabold mb-2 bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent drop-shadow">
          자주 묻는 질문
        </h1>
        <p class="text-white/95 text-sm sm:text-base font-medium">가져가구 이용 전 궁금한 점을 한 곳에 모았어요</p>
      </div>
    </section>

    <!-- FAQ Content -->
    <section class="max-w-4xl mx-auto px-6 py-12">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">무엇을 도와드릴까요?</h2>
        <div class="flex gap-2 self-end sm:self-auto">
          <button class="btn-secondary" @click="collapseAll">모두 닫기</button>
          <button class="btn-primary" @click="expandAll">모두 열기</button>
        </div>
      </div>

      <div class="space-y-8">
        <div v-for="(section, sIdx) in sections" :key="section.title">
          <h3 class="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-sm font-black">{{ sIdx + 1 }}</span>
            {{ section.title }}
          </h3>

          <div class="space-y-3">
            <div
              v-for="(item, iIdx) in section.items"
              :key="item.q"
              class="group card overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
            >
              <button
                class="w-full flex items-start justify-between text-left px-5 py-4"
                @click="toggle(sIdx, iIdx)"
                :aria-expanded="isOpen(sIdx, iIdx)"
              >
                <div class="pr-4">
                  <p class="text-gray-900 dark:text-white font-semibold">{{ item.q }}</p>
                  <p v-if="isOpen(sIdx, iIdx)" class="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">{{ item.a }}</p>
                </div>
                <span
                  class="ml-4 mt-1 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-600"
                >
                  <svg v-if="!isOpen(sIdx, iIdx)" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
type FaqItem = { q: string; a: string }
type FaqSection = { title: string; items: FaqItem[] }

const sections: FaqSection[] = [
  {
    title: '가구 판매와 등록',
    items: [
      { q: 'Q1. 가구 등록은 누구나 할 수 있나요?', a: 'A1. 네, 전화번호와 비밀번호만 설정하시면 누구나 쉽게 가구를 등록할 수 있습니다.' },
      { q: 'Q2. 상태가 좋지 않은 가구도 등록할 수 있나요?', a: 'A2. 가능합니다. 다만 가구 상태를 ‘등급’으로 표시하여 구매자가 선택할 수 있도록 합니다.' },
      { q: 'Q3. 가격은 어떻게 정하나요?', a: 'A3. 판매자가 직접 가격을 결정합니다. 배송료를 제외한 판매금을 받으실 수 있습니다.' },
    ],
  },
  {
    title: '구매와 결제',
    items: [
      { q: 'Q1. 결제는 어떻게 하나요?', a: 'A1. 현재는 계좌이체 방식을 지원하며, 추후 카드결제 및 간편결제 시스템을 도입할 예정입니다.' },
      { q: 'Q2. 가구는 직접 확인할 수 있나요?', a: 'A2. 네, 구매 전 채팅으로 조율해 직접 확인하거나 사진·영상으로 확인할 수 있습니다.' },
    ],
  },
  {
    title: '배송에 관하여',
    items: [
      { q: 'Q1. 배송은 누가 하나요?', a: 'A1. 가져가구 측이 고용하는 직영 라이더와 직접 등록한 라이더 분들이 배송을 맡습니다.' },
      { q: 'Q2. 배송비는 어떻게 정해지나요?', a: 'A2. 거리와 가구 크기에 따라 산정됩니다. 자세한 사항은 채팅으로 안내드릴 예정입니다.' },
      { q: 'Q3. 라이더는 안전한가요?', a: 'A3. 라이더는 가입 시 기본 인증 절차를 거치며, 배송 후에는 사용자 평가 시스템을 통해 신뢰성을 확보합니다.' },
    ],
  },
  {
    title: '가져가구에 대해',
    items: [
      { q: 'Q1. 가져가구는 왜 필요한가요?', a: 'A1. 기존 플랫폼들은 ‘운반 문제’가 해결되지 않아 불편했습니다. 이런 니즈 해결을 위해 가져가구는 등록부터 배송까지 한 번에 연결합니다.' },
      { q: 'Q2. 가져가구는 무료인가요?', a: 'A2. 가구 등록과 둘러보기는 무료입니다. 거래가 성사되면 배송비만 판매자 측에서 부담하시면 됩니다. 거리에 따라 구매자 부담 배송비가 발생할 수 있습니다.' },
    ],
  },
]

const openKeys = ref<Set<string>>(new Set())
const keyOf = (sIdx: number, iIdx: number) => `${sIdx}-${iIdx}`
const isOpen = (sIdx: number, iIdx: number) => openKeys.value.has(keyOf(sIdx, iIdx))
const toggle = (sIdx: number, iIdx: number) => {
  const k = keyOf(sIdx, iIdx)
  const next = new Set(openKeys.value)
  if (next.has(k)) next.delete(k)
  else next.add(k)
  openKeys.value = next
}
const expandAll = () => {
  const next = new Set<string>()
  sections.forEach((section, sIdx) => {
    section.items.forEach((_, iIdx) => next.add(keyOf(sIdx, iIdx)))
  })
  openKeys.value = next
}
const collapseAll = () => {
  openKeys.value = new Set()
}

useHead({
  title: 'FAQ | 가져가구',
  meta: [
    { name: 'description', content: '가져가구 자주 묻는 질문과 답변' },
  ],
})
</script>

<style scoped>
</style>


