<template>
  <ClientOnly>
  <nav class="sticky top-0 z-50 bg-gradient-to-r from-purple-800/90 via-pink-700/90 to-orange-600/90 backdrop-blur-md border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- 로고 -->
        <NuxtLink to="/" class="flex items-center space-x-3 group cursor-pointer">
          <div class="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <img src="/logo.svg" alt="가져가구 로고" class="w-6 h-6 brightness-0 invert" />
          </div>
          <span class="text-xl font-black bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">가져가구</span>
        </NuxtLink>

        <!-- 데스크탑 네비게이션 -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/#furniture-list" class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm" active-class="text-white font-bold">가구 둘러보기</NuxtLink>
          <NuxtLink to="/furniture/create" class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm" active-class="text-white font-bold">내 가구 팔기</NuxtLink>
          <NuxtLink to="/about" class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm" active-class="text-white font-bold">서비스 소개</NuxtLink>
          <NuxtLink to="/faq" class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm" active-class="text-white font-bold">자주 묻는 질문</NuxtLink>
          <NuxtLink to="/contact" class="text-white/90 hover:text-white transition-colors font-semibold drop-shadow-sm" active-class="text-white font-bold">문의하기</NuxtLink>
        </nav>

        <!-- 우측 버튼들 -->
        <div class="flex items-center space-x-2">
          <!-- 다크모드 토글 버튼 -->
          <button
            @click="toggleColorMode"
            class="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
            :title="colorMode.value === 'dark' ? '라이트모드로 전환' : '다크모드로 전환'"
          >
            <!-- 라이트모드 아이콘 (다크모드일 때 표시) -->
            <svg
              v-if="colorMode.value === 'dark'"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <!-- 다크모드 아이콘 (라이트모드일 때 표시) -->
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          <!-- 모바일 햄버거 메뉴 버튼 -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
            :title="isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

             <!-- 모바일 네비게이션 메뉴 -->
       <div
         v-show="isMobileMenuOpen"
         class="md:hidden border-t border-white/10 bg-gradient-to-r from-purple-800/95 via-pink-700/95 to-orange-600/95 backdrop-blur-md rounded-t-2xl rounded-b-2xl shadow-lg"
       >
        <div class="px-2 pt-2 pb-2 space-y-1">
          <NuxtLink
            to="/#furniture-list"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            active-class="text-white bg-white/20 font-bold"
          >
            가구 둘러보기
          </NuxtLink>
          <NuxtLink
            to="/furniture/create"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            active-class="text-white bg-white/20 font-bold"
          >
            내 가구 팔기
          </NuxtLink>
          <NuxtLink
            to="/about"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            active-class="text-white bg-white/20 font-bold"
          >
            서비스 소개
          </NuxtLink>
          <NuxtLink
            to="/faq"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            active-class="text-white bg-white/20 font-bold"
          >
            자주 묻는 질문
          </NuxtLink>
          <NuxtLink
            to="/contact"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            active-class="text-white bg-white/20 font-bold"
          >
            문의하기
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isMobileMenuOpen = ref(false)

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 화면 크기가 변경될 때 모바일 메뉴 닫기
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) { // md 브레이크포인트
      isMobileMenuOpen.value = false
    }
  }
  
  window.addEventListener('resize', handleResize)
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>
